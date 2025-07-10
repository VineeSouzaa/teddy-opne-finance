import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'

export abstract class UserRepositoryFactory {
  abstract create(): UserRepository
} 