import { UserCreateUseCaseDto } from '@application/dto/user/user-create-use-case-dto'
import { User } from '@domain/entities/user.entity'
import { IUserRepository } from '@domain/ports/user.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: UserCreateUseCaseDto): Promise<Omit<User, 'password'>> {
    return this.userRepository.save(
      new User({
        email: user.email,
        name: user.name,
        password: user.password,
      }),
    )
  }
}
