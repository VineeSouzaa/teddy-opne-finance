import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './modules/database.module'
import { DomainModule } from './modules/domain.module'
import { ApplicationModule } from './modules/application.module'
import { InfrastructureModule } from './modules/infrastructure.module'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { IUserRepository } from '@domain/ports/user.repository'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { PresentationModule } from './modules/presentation.module'
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DomainModule,
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [


  ]
})
export class AppModule {}
