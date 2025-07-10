import { Injectable } from '@nestjs/common'
import { UserRepositoryFactory } from '@domain/repositories/factory/user-repository.factory'
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'

@Injectable()
export class TypeOrmUserRepositoryFactory extends UserRepositoryFactory {
  constructor(private readonly userTypeOrmRepository: UserTypeOrmRepository) {
    super()
  }

  create(): UserRepository {
    return this.userTypeOrmRepository
  }
} 