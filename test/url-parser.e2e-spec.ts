import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { TestUser, TestUtils } from './helpers/test-utils'

describe('URL Parser (e2e)', () => {
  let app: INestApplication
  let testUser: TestUser
  let authToken: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    // Create a test user for authenticated tests
    testUser = {
      name: 'Test User',
      email: TestUtils.generateRandomEmail(),
      password: TestUtils.generateValidPassword(),
    }

    await TestUtils.createTestUser(app, testUser)
    authToken = await TestUtils.loginUser(app, {
      email: testUser.email,
      password: testUser.password,
    })
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /url-parser', () => {
    it('should create short URL without authentication', async () => {
      const originalUrl =
        'https://www.example.com/very/long/url/that/needs/shortening'

      const response = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: originalUrl })
        .expect(201)

      expect(response.body).toHaveProperty('shortUrl')
      expect(response.body).toHaveProperty('originalUrl')
      expect(response.body.originalUrl).toBe(originalUrl)
      expect(typeof response.body.shortUrl).toBe('string')
      expect(response.body.shortUrl.length).toBeGreaterThan(0)
    })

    it('should create short URL with authentication', async () => {
      const originalUrl = 'https://www.example.com/authenticated/url'

      const response = await request(app.getHttpServer())
        .post('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ url: originalUrl })
        .expect(201)

      expect(response.body).toHaveProperty('shortUrl')
      expect(response.body).toHaveProperty('originalUrl')
      expect(response.body.originalUrl).toBe(originalUrl)
    })

    it('should generate different short URLs for different original URLs', async () => {
      const url1 = 'https://www.example.com/page1'
      const url2 = 'https://www.example.com/page2'

      const response1 = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: url1 })
        .expect(201)

      const response2 = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: url2 })
        .expect(201)

      expect(response1.body.shortUrl).not.toBe(response2.body.shortUrl)
    })

    it('should generate the same short URL for the same original URL', async () => {
      const originalUrl = 'https://www.example.com/consistent/url'

      const response1 = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: originalUrl })
        .expect(201)

      const response2 = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: originalUrl })
        .expect(201)

      expect(response1.body.shortUrl).toBe(response2.body.shortUrl)
    })

    it('should handle invalid URL format', async () => {
      await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: 'not-a-valid-url' })
        .expect(400)
    })

    it('should handle empty URL', async () => {
      await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: '' })
        .expect(400)
    })

    it('should handle missing URL in request body', async () => {
      await request(app.getHttpServer())
        .post('/url-parser')
        .send({})
        .expect(400)
    })

    it('should handle URLs with special characters', async () => {
      const urlWithSpecialChars =
        'https://www.example.com/url?param=value&another=param#fragment'

      const response = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: urlWithSpecialChars })
        .expect(201)

      expect(response.body.originalUrl).toBe(urlWithSpecialChars)
    })
  })

  describe('GET /url-parser/short-url/:shortUrl', () => {
    it('should retrieve original URL by short URL', async () => {
      const originalUrl = 'https://www.example.com/test-redirect'

      // Create short URL
      const createResponse = await request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: originalUrl })
        .expect(201)

      const shortUrl = createResponse.body.shortUrl
      const shortCode = shortUrl.split('/').pop()

      // Retrieve original URL
      const getResponse = await request(app.getHttpServer())
        .get(`/url-parser/short-url/${shortCode}`)
        .expect(200)

      expect(getResponse.body).toHaveProperty('originalUrl')
      expect(getResponse.body.originalUrl).toBe(originalUrl)
    })

    it('should handle non-existent short URL', async () => {
      await request(app.getHttpServer())
        .get('/url-parser/short-url/nonexistent')
        .expect(404)
    })

    it('should handle malformed short URL', async () => {
      await request(app.getHttpServer())
        .get('/url-parser/short-url/')
        .expect(404)
    })
  })

  describe('GET /url-parser (authenticated)', () => {
    it('should return all URLs for authenticated user', async () => {
      // Create a few URLs first
      const urls = [
        'https://www.example.com/url1',
        'https://www.example.com/url2',
        'https://www.example.com/url3',
      ]

      for (const url of urls) {
        await request(app.getHttpServer())
          .post('/url-parser')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ url })
          .expect(201)
      }

      const response = await request(app.getHttpServer())
        .get('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThanOrEqual(urls.length)
    })

    it('should require authentication', async () => {
      await request(app.getHttpServer()).get('/url-parser').expect(401)
    })
  })

  describe('GET /url-parser/:id (authenticated)', () => {
    it('should return specific URL by ID for authenticated user', async () => {
      const originalUrl = 'https://www.example.com/specific-url'

      // Create URL
      const createResponse = await request(app.getHttpServer())
        .post('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ url: originalUrl })
        .expect(201)

      // Get all URLs to find the created one
      const getAllResponse = await request(app.getHttpServer())
        .get('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      const createdUrl = getAllResponse.body.find(
        (url: any) => url.originalUrl === originalUrl,
      )
      expect(createdUrl).toBeDefined()

      // Get specific URL by ID
      const getResponse = await request(app.getHttpServer())
        .get(`/url-parser/${createdUrl.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(getResponse.body).toHaveProperty('originalUrl')
      expect(getResponse.body.originalUrl).toBe(originalUrl)
    })

    it('should require authentication', async () => {
      await request(app.getHttpServer()).get('/url-parser/123').expect(401)
    })
  })

  describe('PUT /url-parser/:id (authenticated)', () => {
    it('should update URL for authenticated user', async () => {
      const originalUrl = 'https://www.example.com/url-to-update'
      const newUrl = 'https://www.example.com/updated-url'

      // Create URL
      await request(app.getHttpServer())
        .post('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ url: originalUrl })
        .expect(201)

      // Get all URLs to find the created one
      const getAllResponse = await request(app.getHttpServer())
        .get('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      const createdUrl = getAllResponse.body.find(
        (url: any) => url.originalUrl === originalUrl,
      )
      expect(createdUrl).toBeDefined()

      // Update URL
      const updateResponse = await request(app.getHttpServer())
        .put(`/url-parser/${createdUrl.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ originalUrl: newUrl })
        .expect(200)

      expect(updateResponse.body).toHaveProperty('originalUrl')
      expect(updateResponse.body.originalUrl).toBe(newUrl)
    })

    it('should require authentication', async () => {
      await request(app.getHttpServer())
        .put('/url-parser/123')
        .send({ originalUrl: 'https://example.com' })
        .expect(401)
    })
  })

  describe('DELETE /url-parser/:id (authenticated)', () => {
    it('should delete URL for authenticated user', async () => {
      const originalUrl = 'https://www.example.com/url-to-delete'

      // Create URL
      await request(app.getHttpServer())
        .post('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ url: originalUrl })
        .expect(201)

      // Get all URLs to find the created one
      const getAllResponse = await request(app.getHttpServer())
        .get('/url-parser')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      const createdUrl = getAllResponse.body.find(
        (url: any) => url.originalUrl === originalUrl,
      )
      expect(createdUrl).toBeDefined()

      // Delete URL
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/url-parser/${createdUrl.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(deleteResponse.body).toHaveProperty('message')
      expect(deleteResponse.body.message).toBe('Short URL deleted successfully')
    })

    it('should require authentication', async () => {
      await request(app.getHttpServer()).delete('/url-parser/123').expect(401)
    })
  })

  describe('GET /url-parser/metrics/duplicated (authenticated)', () => {
    it('should return duplicated short URLs metrics', async () => {
      const response = await request(app.getHttpServer())
        .get('/url-parser/metrics/duplicated')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toHaveProperty('duplicatedShortUrls')
      expect(Array.isArray(response.body.duplicatedShortUrls)).toBe(true)
    })

    it('should require authentication', async () => {
      await request(app.getHttpServer())
        .get('/url-parser/metrics/duplicated')
        .expect(401)
    })
  })
})
