import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('Root endpoints', () => {
    it('/ (GET) should return Hello World!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!')
    })

    it('/health (GET) should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('status')
          expect(res.body).toHaveProperty('timestamp')
          expect(res.body.status).toBe('ok')
          expect(typeof res.body.timestamp).toBe('string')
        })
    })

    it('/health (GET) should return valid ISO timestamp', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect(res => {
          const timestamp = new Date(res.body.timestamp)
          expect(timestamp.getTime()).not.toBeNaN()
          expect(res.body.timestamp).toMatch(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
          )
        })
    })
  })

  describe('URL Parser endpoints', () => {
    it('/url-parser (POST) should parse URL without authentication', () => {
      const testUrl =
        'https://www.example.com/very/long/url/that/needs/shortening'

      return request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: testUrl })
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('shortUrl')
          expect(res.body).toHaveProperty('originalUrl')
          expect(res.body.originalUrl).toBe(testUrl)
          expect(typeof res.body.shortUrl).toBe('string')
          expect(res.body.shortUrl.length).toBeGreaterThan(0)
        })
    })

    it('/url-parser (POST) should handle invalid URL', () => {
      return request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: 'not-a-valid-url' })
        .expect(400)
    })

    it('/url-parser (POST) should handle empty URL', () => {
      return request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: '' })
        .expect(400)
    })

    it('/url-parser (POST) should handle missing URL', () => {
      return request(app.getHttpServer())
        .post('/url-parser')
        .send({})
        .expect(400)
    })

    it('/url-parser/short-url/:shortUrl (GET) should redirect to original URL', () => {
      // First create a short URL
      const testUrl = 'https://www.example.com/test-redirect'

      return request(app.getHttpServer())
        .post('/url-parser')
        .send({ url: testUrl })
        .expect(201)
        .then(res => {
          const shortUrl = res.body.shortUrl
          const shortCode = shortUrl.split('/').pop()

          return request(app.getHttpServer())
            .get(`/url-parser/short-url/${shortCode}`)
            .expect(200)
            .expect(redirectRes => {
              expect(redirectRes.body).toHaveProperty('originalUrl')
              expect(redirectRes.body.originalUrl).toBe(testUrl)
            })
        })
    })

    it('/url-parser/short-url/:shortUrl (GET) should handle non-existent short URL', () => {
      return request(app.getHttpServer())
        .get('/url-parser/short-url/nonexistent')
        .expect(404)
    })
  })

  describe('Authentication endpoints', () => {
    it('/auth/login (POST) should handle login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(401) // Should fail without proper user setup
    })

    it('/auth/login (POST) should handle login with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'wrongpassword',
        })
        .expect(401)
    })

    it('/auth/login (POST) should handle missing credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({})
        .expect(400)
    })
  })

  describe('User endpoints', () => {
    it('/user (POST) should create user with valid data', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }

      return request(app.getHttpServer())
        .post('/user')
        .send(userData)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('id')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('email')
          expect(res.body.name).toBe(userData.name)
          expect(res.body.email).toBe(userData.email)
          expect(res.body).not.toHaveProperty('password')
        })
    })

    it('/user (POST) should handle duplicate email', () => {
      const userData = {
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123',
      }

      // Create first user
      return request(app.getHttpServer())
        .post('/user')
        .send(userData)
        .expect(201)
        .then(() => {
          // Try to create second user with same email
          return request(app.getHttpServer())
            .post('/user')
            .send(userData)
            .expect(400)
        })
    })

    it('/user (POST) should handle invalid user data', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          name: '',
          email: 'invalid-email',
          password: '123',
        })
        .expect(400)
    })
  })

  describe('Protected endpoints', () => {
    it('/url-parser (GET) should require authentication', () => {
      return request(app.getHttpServer()).get('/url-parser').expect(401)
    })

    it('/url-parser/:id (GET) should require authentication', () => {
      return request(app.getHttpServer()).get('/url-parser/123').expect(401)
    })

    it('/url-parser/:id (PUT) should require authentication', () => {
      return request(app.getHttpServer())
        .put('/url-parser/123')
        .send({ originalUrl: 'https://example.com' })
        .expect(401)
    })

    it('/url-parser/:id (DELETE) should require authentication', () => {
      return request(app.getHttpServer()).delete('/url-parser/123').expect(401)
    })

    it('/url-parser/metrics/duplicated (GET) should require authentication', () => {
      return request(app.getHttpServer())
        .get('/url-parser/metrics/duplicated')
        .expect(401)
    })
  })
})
