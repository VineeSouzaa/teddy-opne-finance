import { Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}
