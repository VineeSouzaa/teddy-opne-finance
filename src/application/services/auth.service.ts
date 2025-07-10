import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "@application/services/users.service"

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signIn(username: string, pass: string): Promise<string> {
      const user = await this.usersService.checkAuth(username, pass)
      if (!user) {
        throw new UnauthorizedException();
      }
      return user.getToken();
    }
}
