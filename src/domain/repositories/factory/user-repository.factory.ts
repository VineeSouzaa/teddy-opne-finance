import { IUserRepository } from '@domain/ports/user.repository'

export abstract class UserRepositoryFactory {
  abstract create(): IUserRepository
}
