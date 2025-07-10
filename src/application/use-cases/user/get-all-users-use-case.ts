import { Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { RepositoryServiceLocator } from '@domain/repositories/service-locator'

@Injectable()
export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {
    const userRepository = RepositoryServiceLocator.getInstance().getUserRepository()
    return userRepository.findAll()
  }
}
