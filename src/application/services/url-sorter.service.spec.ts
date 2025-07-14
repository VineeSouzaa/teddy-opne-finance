import { UrlShortenerService } from './url-sorter.service'

describe('UrlShortenerService', () => {
  let service: UrlShortenerService

  beforeEach(() => {
    service = new UrlShortenerService()
  })

  describe('generateShortCode', () => {
    it('should generate a short code with default length of 6', () => {
      const originalUrl =
        'https://www.example.com/very/long/url/that/needs/shortening'
      const shortCode = service.generateShortCode(originalUrl)

      expect(shortCode).toBeDefined()
      expect(shortCode.length).toBe(6)
      expect(typeof shortCode).toBe('string')
    })

    it('should generate different codes for different URLs', () => {
      const url1 = 'https://www.example.com/page1'
      const url2 = 'https://www.example.com/page2'

      const code1 = service.generateShortCode(url1)
      const code2 = service.generateShortCode(url2)

      expect(code1).not.toBe(code2)
    })

    it('should generate the same code for the same URL', () => {
      const url = 'https://www.example.com/consistent/url'

      const code1 = service.generateShortCode(url)
      const code2 = service.generateShortCode(url)

      expect(code1).toBe(code2)
    })

    it('should generate a short code with custom length', () => {
      const originalUrl = 'https://www.example.com/url'
      const customLength = 8

      const shortCode = service.generateShortCode(originalUrl, customLength)

      expect(shortCode.length).toBe(customLength)
    })

    it('should handle empty URL', () => {
      const shortCode = service.generateShortCode('')

      expect(shortCode).toBeDefined()
      expect(shortCode.length).toBe(6)
    })

    it('should handle special characters in URL', () => {
      const urlWithSpecialChars =
        'https://www.example.com/url?param=value&another=param#fragment'
      const shortCode = service.generateShortCode(urlWithSpecialChars)

      expect(shortCode).toBeDefined()
      expect(shortCode.length).toBe(6)
    })

    it('should generate codes using base62 alphabet', () => {
      const url = 'https://www.example.com/test'
      const shortCode = service.generateShortCode(url)

      // Check if the code only contains valid base62 characters
      const base62Regex = /^[0-9a-zA-Z]+$/
      expect(shortCode).toMatch(base62Regex)
    })
  })
})
