import { AuthOptionalGuard } from '@infrastructure/guards/auth-optional.guard'
import { AuthGuard } from '@infrastructure/guards/auth.guard'
import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { UrlParserService } from '@presentation/services/url-parser.service'

@Controller('url-parser')
export class UrlParserController {
  constructor(private readonly urlParserService: UrlParserService) {}

  @Post()
  @UseGuards(AuthOptionalGuard)
  async parseUrl(@Body() url: string) {
    return this.urlParserService.parseUrl(url)
  }
}
