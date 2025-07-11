import { AuthService } from '@application/services/auth.service'
import { UsersService } from '@application/services/users.service'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { Module } from '@nestjs/common'
import { AuthController } from '@presentation/controllers/auth.controller'
import { UserController } from '@presentation/controllers/user.controller'
import { ApplicationModule } from './application.module'
import { AppModule } from 'src/app.module'
import { InfrastructureModule } from './infrastructure.module'

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UsersService,
  ],
  exports: [
    AuthService,
    UsersService,
  ]
})
export class PresentationModule {}