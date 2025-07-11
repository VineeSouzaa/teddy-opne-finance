import { AuthService } from '@application/services/auth.service'
import { UsersService } from '@application/services/users.service'
import { Module } from '@nestjs/common'
import { AuthController } from '@presentation/controllers/auth.controller'
import { UrlParserController } from '@presentation/controllers/url-parser.controller'
import { UserController } from '@presentation/controllers/user.controller'
import { UrlParserService } from '@presentation/services/url-parser.service'
import { InfrastructureModule } from './infrastructure.module'

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController, UserController, UrlParserController],
  providers: [AuthService, UsersService, UrlParserService],
  exports: [AuthService, UsersService],
})
export class PresentationModule {}
