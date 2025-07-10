import { Injectable } from '@nestjs/common';
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case';
import { User } from '@domain/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly validateUserPasswordUseCase: ValidateUserPasswordUseCase) {}

    async checkAuth(username: string, pass: string): Promise<User | null> {
        return this.validateUserPasswordUseCase.execute(username, pass)
    }
}
