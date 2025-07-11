import { Module } from '@nestjs/common'
import { DomainModule } from './domain.module'

// Use Cases
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'

// Services
import { UsersService } from '@application/services/users.service'
import { AuthService } from '@application/services/auth.service'

@Module({
  imports: [DomainModule],
  providers: [
    // Use Cases
    // CreateUserUseCase, 
    // GetUserUseCase, 
    // GetAllUsersUseCase, 
    // ValidateUserPasswordUseCase,
    
    // Application Services
    // UsersService,
    // AuthService,

  ],
  exports: [
    // CreateUserUseCase, 
    // GetUserUseCase, 
    // GetAllUsersUseCase, 
    // ValidateUserPasswordUseCase,
    // UsersService,
    // AuthService,
  ],
})
export class ApplicationModule {} 