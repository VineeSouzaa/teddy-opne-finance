import { UrlShortenerService } from '@application/services/url-sorter.service'
import { CreateUserUrlUseCase } from '@application/use-cases/url-parser/create-user-url-use-case'
import { Injectable } from '@nestjs/common'
import { UrlParserServiceDto } from '@presentation/dto/services/url-parser-service.dto'

@Injectable()
export class UrlParserService {
  constructor(
    private readonly createUserUrlUseCase: CreateUserUrlUseCase,
    private readonly urlShortenerService: UrlShortenerService,
  ) {}

  parseUrl(urlParserServiceDto: UrlParserServiceDto) {
    if (urlParserServiceDto.user) {
      return this.createUserUrlUseCase.execute({
        originalUrl: urlParserServiceDto.url,
        userId: urlParserServiceDto.user.id,
        shortUrl: this.urlShortenerService.generateShortCode(
          urlParserServiceDto.url,
        ),
        host: urlParserServiceDto.host,
      })
    }
    return {
      originalUrl: urlParserServiceDto.url,
      shortUrl: this.urlShortenerService.generateShortCode(
        urlParserServiceDto.url,
      ),
    }
  }
}
