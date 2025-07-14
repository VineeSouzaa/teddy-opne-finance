import { AppService } from '@presentation/services/app.service'
import { AppController } from './app.controller'

describe('AppController', () => {
  let controller: AppController
  let service: AppService

  beforeEach(() => {
    service = new AppService()
    controller = new AppController(service)
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const result = controller.getHello()
      expect(result).toBe('Hello World!')
    })

    it('should call appService.getHello', () => {
      const getHelloSpy = jest.spyOn(service, 'getHello')
      controller.getHello()
      expect(getHelloSpy).toHaveBeenCalled()
    })
  })

  describe('getHealth', () => {
    it('should return health status object', () => {
      const result = controller.getHealth()

      expect(result).toHaveProperty('status')
      expect(result).toHaveProperty('timestamp')
      expect(result.status).toBe('ok')
      expect(typeof result.timestamp).toBe('string')
    })

    it('should return valid ISO timestamp', () => {
      const result = controller.getHealth()
      const timestamp = new Date(result.timestamp)

      expect(timestamp.getTime()).not.toBeNaN()
      expect(result.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      )
    })

    it('should return current timestamp', () => {
      const beforeCall = new Date()
      const result = controller.getHealth()
      const afterCall = new Date()
      const resultTime = new Date(result.timestamp)

      expect(resultTime.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime())
      expect(resultTime.getTime()).toBeLessThanOrEqual(afterCall.getTime())
    })
  })
})
