import { Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { RepositoryServiceLocator } from '@domain/repositories/service-locator'

@Injectable()
export class GetUserUseCase {
  async execute(id: string): Promise<User | null> {
    const userRepository = RepositoryServiceLocator.getInstance().getUserRepository()
    return userRepository.findById(id)
  }
}
