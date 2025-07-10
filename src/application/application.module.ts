import { Module } from '@nestjs/common'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { UsersService } from '@application/services/users.service'
import { AuthService } from '@application/services/auth.service'

@Module({
  providers: [
    //use-cases
    CreateUserUseCase, 
    GetUserUseCase, 
    GetAllUsersUseCase,
    ValidateUserPasswordUseCase,

    //services
    UsersService,
    AuthService,
  ],
  exports: [CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase],
})
export class ApplicationModule {}
