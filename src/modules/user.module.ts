import { Module } from '@nestjs/common'

import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { UserController } from '@presentation/controllers/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@domain/entities/user.entity'
import { IUserRepositorySymbol } from '@domain/interface/user-repository.interface'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
  ],
  providers: [
    CreateUserUseCase, 
    GetUserUseCase, 
    GetAllUsersUseCase, 
    ValidateUserPasswordUseCase,
    {
        provide: IUserRepositorySymbol,
        useExisting: UserTypeOrmRepository,
    },
    UserTypeOrmRepository,
  ],
  exports: [CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase, ValidateUserPasswordUseCase],
  controllers: [UserController],
})
export class UserModule {}