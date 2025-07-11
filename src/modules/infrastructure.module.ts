import { CreateUserUrlUseCase } from '@application/use-cases/url-parser/create-user-url-use-case'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { IUserRepository } from '@domain/ports/user.repository'
import { UserEntity } from '@infrastructure/entity/user-entity'
import { UserUrlEntity } from '@infrastructure/entity/user-url-entity'
import { UserUrlTypeOrmRepository } from '@infrastructure/repositories/typeorm/user-url.typeorm.repository'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity, UserUrlEntity]),
  ],
  providers: [
    {
      provide: 'IUserUrlRepository',
      useClass: UserUrlTypeOrmRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: CreateUserUrlUseCase,
      useFactory: (repo: IUserUrlRepository) => new CreateUserUrlUseCase(repo),
      inject: ['IUserUrlRepository'],
    },
    {
      provide: ValidateUserPasswordUseCase,
      useFactory: (repo: IUserRepository) =>
        new ValidateUserPasswordUseCase(repo),
      inject: ['IUserRepository'],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo: IUserRepository) => new CreateUserUseCase(repo),
      inject: ['IUserRepository'],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (repo: IUserRepository) => new GetAllUsersUseCase(repo),
      inject: ['IUserRepository'],
    },
    {
      provide: GetUserUseCase,
      useFactory: (repo: IUserRepository) => new GetUserUseCase(repo),
      inject: ['IUserRepository'],
    },
    UserTypeOrmRepository,
    JwtService,
    {
      provide: 'BcryptService',
      useValue: {
        hash,
        compare,
      },
    },
  ],
  exports: [
    'IUserRepository',
    'IUserUrlRepository',
    CreateUserUrlUseCase,
    ValidateUserPasswordUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserUseCase,
    UserTypeOrmRepository,
    JwtService, // TODO: make application interface for jwt service
    'BcryptService',
  ],
})
export class InfrastructureModule {}
