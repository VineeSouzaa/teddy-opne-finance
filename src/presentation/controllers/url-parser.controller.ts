import { DeleteUserUrlUseCase } from '@application/use-cases/url-parser/delete-user-url-use-case'
import { GetAllUserUrlUseCase } from '@application/use-cases/url-parser/get-all-user-url-use-case'
import { GetByFilterUserUrlUseCase } from '@application/use-cases/url-parser/get-by-filter-user-url-use-case'
import { GetByIdUserUrlUseCase } from '@application/use-cases/url-parser/get-by-id-user-url-use-case'
import { GetDuplicatedShortUrlsUseCase } from '@application/use-cases/url-parser/get-duplicated-short-urls-use-case'
import { UpdateUserUrlUseCase } from '@application/use-cases/url-parser/update-user-url-use-case'
import { User } from '@domain/entities/user.entity'
import { AuthOptionalGuard } from '@infrastructure/guards/auth-optional.guard'
import { AuthGuard } from '@infrastructure/guards/auth.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '@presentation/decorators/current-user.decorator'
import { UserUrlCreateDto } from '@presentation/dto/controllers/user-url/user-url-create.dto'
import { UserUrlUpdateDto } from '@presentation/dto/controllers/user-url/user-url-update.dto'
import { UrlParserService } from '@presentation/services/url-parser.service'

@ApiTags('URL Parser')
@Controller('url-parser')
export class UrlParserController {
  constructor(
    private readonly urlParserService: UrlParserService,
    private readonly getByIdUserUrlUseCase: GetByIdUserUrlUseCase,
    private readonly getAllUserUrlUseCase: GetAllUserUrlUseCase,
    private readonly updateUserUrlUseCase: UpdateUserUrlUseCase,
    private readonly deleteUserUrlUseCase: DeleteUserUrlUseCase,
    private readonly getDuplicatedShortUrlsUseCase: GetDuplicatedShortUrlsUseCase,
    private readonly getByFilterUserUrlUseCase: GetByFilterUserUrlUseCase,
  ) {}

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getShortUrl(@Param('id') id: string) {
    const userUrl = await this.getByIdUserUrlUseCase.execute({
      id,
    })
    return {
      originalUrl: userUrl.originalUrl,
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('')
  async getAllShortUrls() {
    const userUrls = await this.getAllUserUrlUseCase.execute()
    return userUrls
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async updateShortUrl(
    @Param('id') id: string,
    @Body() userUrlUpdateDto: UserUrlUpdateDto,
  ) {
    const userUrl = await this.updateUserUrlUseCase.execute({
      id,
      originalUrl: userUrlUpdateDto.originalUrl,
      shortUrl: userUrlUpdateDto.shortUrl,
      active: userUrlUpdateDto.active,
    })
    return userUrl
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteShortUrl(@Param('id') id: string) {
    await this.deleteUserUrlUseCase.execute({
      id,
    })
    return {
      message: 'Short URL deleted successfully',
    }
  }

  @Get('metrics/duplicated')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getDuplicatedShortUrls() {
    const duplicatedShortUrls =
      await this.getDuplicatedShortUrlsUseCase.execute()
    return {
      duplicatedShortUrls,
    }
  }

  @Get('short-url/:shortUrl')
  @UseGuards(AuthOptionalGuard)
  @ApiBearerAuth()
  async getShortUrlByShortUrl(@Param('shortUrl') shortUrl: string) {
    const userUrl = await this.getByFilterUserUrlUseCase.execute({
      shortUrl,
    })
    return userUrl
  }
}
