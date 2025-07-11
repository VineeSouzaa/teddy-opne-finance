import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "@application/services/users.service"
import { ErrorMessages } from '@shared/utils/error-messages'
import { AppError } from '@shared/utils/app-errors'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signIn(username: string, pass: string): Promise<string> {
      const user = await this.usersService.checkAuth(username, pass)
      if (!user) {
        throw new UnauthorizedException({
          message: ErrorMessages.AUTH.INVALID_CREDENTIALS
        });
      }
      return 'token';
    }

    // Alternative using AppError
    async signInWithAppError(username: string, pass: string): Promise<string> {
      const user = await this.usersService.checkAuth(username, pass)
      if (!user) {
        throw AppError.invalidCredentials()
      }
      return 'token';
    }
}
