import { Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { RepositoryServiceLocator } from '@domain/repositories/service-locator'
import { UserCreateDto } from '@application/dto/user/user-create-dto'

@Injectable()
export class CreateUserUseCase {
  async execute(user: UserCreateDto): Promise<User> {
    const userRepository = RepositoryServiceLocator.getInstance().getUserRepository()
    return userRepository.save(new User({
      email: user.email,
      name: user.name,
    }))
  }
}
