import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import { User } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    private readonly validateUserPasswordUseCase: ValidateUserPasswordUseCase,
  ) {}

  async checkAuth(username: string, pass: string): Promise<User | null> {
    return await this.validateUserPasswordUseCase.execute({
      email: username,
      password: pass,
    })
  }
}
