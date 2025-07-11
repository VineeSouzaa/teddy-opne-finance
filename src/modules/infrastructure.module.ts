import { Module } from '@nestjs/common'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { DatabaseModule } from './database.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@infrastructure/entity/user-entity'
import { IUserRepository } from '@domain/ports/user.repository'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
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
