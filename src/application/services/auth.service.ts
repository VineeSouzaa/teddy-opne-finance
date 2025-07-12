import { UsersService } from '@application/services/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppError } from '@shared/utils/app-errors'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.checkAuth(username, pass)
    if (!user) {
      throw AppError.invalidCredentials()
    }

    const payload = { id: user.id, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '10m',
      }), // fix set configuration in module and set expiration time
    }
  }
}
