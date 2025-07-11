import { Inject, Injectable } from '@nestjs/common'
import { User } from '@domain/entities/user.entity'
import { IUserRepository } from '@domain/ports/user.repository'

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
