import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from '@domain/entities/user.entity'
import { UserCreateDto } from '@application/dto/user/user-create-dto'
import { IUserRepository, IUserRepositorySymbol } from '@domain/interface/user-repository.interface'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepositorySymbol) 
    private readonly userRepository: IUserRepository
  ) {}

  async execute(user: UserCreateDto): Promise<UserEntity> {
    return this.userRepository.save(new UserEntity({
      email: user.email,
      name: user.name,
      password: user.password,
    }))
  }
}
