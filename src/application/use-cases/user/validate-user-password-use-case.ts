import { UserEntity } from '@domain/entities/user.entity'
import { IUserRepository, IUserRepositorySymbol } from '@domain/interface/user-repository.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ValidateUserPasswordUseCase {
    constructor(  
        @Inject(IUserRepositorySymbol)
        private readonly userRepository: IUserRepository
    ) {}

    async execute(username: string, pass: string): Promise<UserEntity | null> {
        return this.userRepository.validatePassword(username, pass)
    }
}