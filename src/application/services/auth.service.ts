import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "@application/services/users.service"
import { ErrorMessages } from '@shared/utils/error-messages'
import { AppError } from '@shared/utils/app-errors'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
      const user = await this.usersService.checkAuth(username, pass)
      if (!user) {
        throw AppError.invalidCredentials()
      }
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '2m' }), // fix set configuration in module and set expiration time
      };
    }
}
