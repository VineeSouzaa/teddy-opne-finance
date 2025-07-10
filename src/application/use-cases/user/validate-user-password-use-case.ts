import { User } from '@domain/entities/user.entity'
import { RepositoryServiceLocator } from '@domain/repositories/service-locator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidateUserPasswordUseCase {

    async execute(username: string, pass: string): Promise<User | null> {
        const userRepository = RepositoryServiceLocator.getInstance().getUserRepository()
        return userRepository.validatePassword(username, pass)
    }
}