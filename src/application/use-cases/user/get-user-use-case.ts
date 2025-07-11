import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from '@domain/entities/user.entity'
import { IUserRepositorySymbol, IUserRepository } from '@domain/interface/user-repository.interface'

@Injectable()
export class GetUserUseCase {
  constructor(  
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id)
  }
}
