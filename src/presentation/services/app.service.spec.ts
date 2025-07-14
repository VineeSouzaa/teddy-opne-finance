import { AppService } from './app.service'

describe('AppService', () => {
  let service: AppService

  beforeEach(() => {
    service = new AppService()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const result = service.getHello()
      expect(result).toBe('Hello World!')
    })

    it('should always return the same string', () => {
      const result1 = service.getHello()
      const result2 = service.getHello()
      expect(result1).toBe(result2)
    })
  })
})
