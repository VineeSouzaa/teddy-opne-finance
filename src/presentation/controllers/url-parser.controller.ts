import { User } from '@domain/entities/user.entity'
import { AuthOptionalGuard } from '@infrastructure/guards/auth-optional.guard'
import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CurrentUser } from '@presentation/decorators/current-user.decorator'
import { UserUrlCreateDto } from '@presentation/dto/controllers/user-url/user-url-create.dto'
import { UrlParserService } from '@presentation/services/url-parser.service'

@Controller('url-parser')
export class UrlParserController {
  constructor(private readonly urlParserService: UrlParserService) {}

  @Post()
  @UseGuards(AuthOptionalGuard)
  // @ApiHeader({
  //   name: 'authorization',
  //   required: false,
  //   description: 'Bearer token for authentication (optional)',
  // })
  @ApiBearerAuth('access-token')
  async parseUrl(
    @Body() userUrlCreateDto: UserUrlCreateDto,
    @CurrentUser() user: User,
    @Req() request: Request,
    @Headers() headers: Headers,
  ) {
    console.log('request in controller', request.headers)
    console.log('user', user)
    console.log('headers', headers)
    return this.urlParserService.parseUrl({
      url: userUrlCreateDto.url,
      user,
      host: request.headers['host'] as string,
    })
  }
}
