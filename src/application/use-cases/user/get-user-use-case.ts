import { GetUserUseCaseDto } from '@application/dto/user/get-user-use-case.dto'
import { IUserRepository } from '@domain/ports/user.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(getUserUseCaseDto: GetUserUseCaseDto) {
    return this.userRepository.findById(getUserUseCaseDto.id)
  }
}
