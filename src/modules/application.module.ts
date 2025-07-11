import { UrlShortenerService } from '@application/services/url-sorter.service'
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
    UrlShortenerService,
  ],
  exports: [
    // CreateUserUseCase,
    // GetUserUseCase,
    // GetAllUsersUseCase,
    // ValidateUserPasswordUseCase,
    // UsersService,
    // AuthService,
    UrlShortenerService,
  ],
})
export class ApplicationModule {}
