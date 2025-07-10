import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'
import { User } from '@domain/entities/user.entity'
import { UserEntity } from '@infrastructure/entities/user.entity'

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    return userEntity ? this.mapToDomain(userEntity) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { email } })
    return userEntity ? this.mapToDomain(userEntity) : null
  }

  async save(user: User): Promise<User> {
    const userEntity = this.mapToInfrastructure(user)
    const savedEntity = await this.userRepository.save(userEntity)
    return this.mapToDomain(savedEntity)
  }

  async update(user: User): Promise<User> {
    const userEntity = this.mapToInfrastructure(user)
    const updatedEntity = await this.userRepository.save(userEntity)
    return this.mapToDomain(updatedEntity)
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find()
    return userEntities.map(entity => this.mapToDomain(entity))
  }

  private mapToDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.email,
      userEntity.name,
      userEntity.createdAt,
      userEntity.updatedAt,
    )
  }

  private mapToInfrastructure(user: User): UserEntity {
    const userEntity = new UserEntity()
    userEntity.id = user.getId()
    userEntity.email = user.getEmail()
    userEntity.name = user.getName()
    userEntity.createdAt = user.getCreatedAt()
    userEntity.updatedAt = user.getUpdatedAt()
    return userEntity
  }
}
