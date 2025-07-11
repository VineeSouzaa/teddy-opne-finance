import { Inject, Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { UserCreateDto } from '@application/dto/user/user-create-dto'
import { IUserRepository } from '@domain/ports/user.repository'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: UserCreateDto): Promise<Omit<User, 'password'>> {
    return this.userRepository.save(
      new User({
        email: user.email,
        name: user.name,
        password: user.password,
      }),
    )
  }
}
