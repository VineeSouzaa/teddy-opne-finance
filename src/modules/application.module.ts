import { Module } from '@nestjs/common'
import { DomainModule } from './domain.module'

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