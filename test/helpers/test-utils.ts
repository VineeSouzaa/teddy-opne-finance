import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export interface TestUser {
  id?: string
  name: string
  email: string
  password: string
}

export interface TestUrl {
  id?: string
  originalUrl: string
  shortUrl?: string
  userId?: string
}

export class TestUtils {
  static async createTestUser(
    app: INestApplication,
    userData: TestUser,
  ): Promise<TestUser> {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(userData)
      .expect(201)

    return {
      ...userData,
      id: response.body.id,
    }
  }

  static async loginUser(
    app: INestApplication,
    credentials: { email: string; password: string },
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(200)

    return response.body.access_token
  }

  static async createShortUrl(
    app: INestApplication,
    urlData: { url: string },
    token?: string,
  ): Promise<TestUrl> {
    const req = request(app.getHttpServer()).post('/url-parser').send(urlData)

    if (token) {
      req.set('Authorization', `Bearer ${token}`)
    }

    const response = await req.expect(201)

    return {
      originalUrl: response.body.originalUrl,
      shortUrl: response.body.shortUrl,
    }
  }

  static generateRandomEmail(): string {
    return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`
  }

  static generateRandomUrl(): string {
    return `https://example.com/${Math.random().toString(36).substring(7)}`
  }

  static generateValidPassword(): string {
    return `password${Math.random().toString(36).substring(7)}123`
  }

  static async cleanupTestData(app: INestApplication): Promise<void> {
    // This would typically clean up test data from the database
    // For now, we'll rely on the test database being reset between tests
  }

  static getAuthHeaders(token: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  static async makeAuthenticatedRequest(
    app: INestApplication,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    token: string,
    data?: any,
  ) {
    const req = request(app.getHttpServer())
      [method](url)
      .set('Authorization', `Bearer ${token}`)

    if (data) {
      req.send(data)
    }

    return req
  }
}
