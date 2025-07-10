import { IUserRepository } from '@domain/repositories/interface/user-repository.interface'

export class RepositoryServiceLocator {
  private static instance: RepositoryServiceLocator
  private userRepository: IUserRepository | null = null

  static getInstance(): RepositoryServiceLocator {
    if (!RepositoryServiceLocator.instance) {
      RepositoryServiceLocator.instance = new RepositoryServiceLocator()
    }
    return RepositoryServiceLocator.instance
  }

  setUserRepository(repository: IUserRepository): void {
    this.userRepository = repository
  }

  getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      throw new Error('UserRepository not registered')
    }
    return this.userRepository
  }
} 