
import { IUserRepository } from '@domain/ports/user.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ValidateUserPasswordUseCase {
    constructor(  
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async execute(username: string, pass: string): Promise<boolean> {
        return await this.userRepository.validatePassword(username, pass)
    }
}