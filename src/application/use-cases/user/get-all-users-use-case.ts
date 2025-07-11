import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from '@domain/entities/user.entity'
import { IUserRepositorySymbol, IUserRepository } from '@domain/interface/user-repository.interface'

@Injectable()
export class GetAllUsersUseCase {
  constructor(  
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }
}
