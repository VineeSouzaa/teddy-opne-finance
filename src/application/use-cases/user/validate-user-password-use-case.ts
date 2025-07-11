import { ValidateUserPasswordUseCaseDto } from '@application/dto/user/validate-user-password-use-case.dto'
import { User } from '@domain/entities/user.entity'
import { IUserRepository } from '@domain/ports/user.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ValidateUserPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    validateUserPasswordUseCaseDto: ValidateUserPasswordUseCaseDto,
  ): Promise<User | null> {
    return await this.userRepository.validatePassword(
      validateUserPasswordUseCaseDto.email,
      validateUserPasswordUseCaseDto.password,
    )
  }
}
