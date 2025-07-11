import { User } from '@domain/entities/user.entity'
import { AuthOptionalGuard } from '@infrastructure/guards/auth-optional.guard'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@presentation/decorators/current-user.decorator'
import { UserUrlCreateDto } from '@presentation/dto/user-url/user-url-create.dto'
import { UrlParserService } from '@presentation/services/url-parser.service'

@Controller('url-parser')
export class UrlParserController {
  constructor(private readonly urlParserService: UrlParserService) {}

  @Post()
  @UseGuards(AuthOptionalGuard)
  async parseUrl(
    @Body() userUrlCreateDto: UserUrlCreateDto,
    @CurrentUser() user: User,
  ) {
    return this.urlParserService.parseUrl(userUrlCreateDto.url, user)
  }
}
