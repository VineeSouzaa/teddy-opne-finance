import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '@domain/ports/user.repository'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    return this.userRepository.findById(id)
  }
}