import { AuthService } from '@application/services/auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginDto } from '@presentation/dto/auth/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: AuthLoginDto) {
        return this.authService.signIn(loginDto.email, loginDto.password)
    }
}
