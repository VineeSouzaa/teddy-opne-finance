import { Injectable } from '@nestjs/common'
import { UserRepositoryFactory } from '@domain/repositories/factory/user-repository.factory'
import { IUserRepository } from '@domain/ports/user.repository'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'

@Injectable()
export class TypeOrmUserRepositoryFactory extends UserRepositoryFactory {
  constructor(private readonly userTypeOrmRepository: UserTypeOrmRepository) {
    super()
  }

  create(): IUserRepository {
    return this.userTypeOrmRepository
  }
} 