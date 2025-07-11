import { Injectable } from '@nestjs/common';
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly validateUserPasswordUseCase: ValidateUserPasswordUseCase) {}

    async checkAuth(username: string, pass: string): Promise<UserEntity | null> {
        return this.validateUserPasswordUseCase.execute(username, pass)
    }
}
