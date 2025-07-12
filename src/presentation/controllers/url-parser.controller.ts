import { User } from '@domain/entities/user.entity'
import { AuthOptionalGuard } from '@infrastructure/guards/auth-optional.guard'
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CurrentUser } from '@presentation/decorators/current-user.decorator'
import { UserUrlCreateDto } from '@presentation/dto/controllers/user-url/user-url-create.dto'
import { UrlParserService } from '@presentation/services/url-parser.service'

@Controller('url-parser')
export class UrlParserController {
  constructor(private readonly urlParserService: UrlParserService) {}

  @Post()
  @UseGuards(AuthOptionalGuard)
  @ApiBearerAuth()
  async parseUrl(
    @Body() userUrlCreateDto: UserUrlCreateDto,
    @CurrentUser() user: User,
    @Req() request: Request,
  ) {
    const userUrl = await this.urlParserService.parseUrl({
      url: userUrlCreateDto.url,
      user,
      host: request.headers['host'] as string,
    })

    return {
      shortUrl: userUrl.shortUrl,
      originalUrl: userUrl.originalUrl,
    }
  }
}
