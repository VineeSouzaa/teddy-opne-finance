import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './modules/database.module'
import { DomainModule } from './modules/domain.module'
import { ApplicationModule } from './modules/application.module'
import { InfrastructureModule } from './modules/infrastructure.module'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { IUserRepository } from '@domain/ports/user.repository'

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
  ],
  controllers: [],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (repo: IUserRepository) => new CreateUserUseCase(repo),
      inject: ['IUserRepository'],
    },
  ]
})
export class AppModule {}
