import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IUserRepository } from '@domain/ports/user.repository'
import { User } from '@domain/entities/user.entity'
import { UserEntity } from '@infrastructure/entity/user-entity'
import { AppError } from '@shared/utils/app-errors'

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject('BcryptService') private readonly bcryptService,
  ) {}

  async validatePassword(username: string, pass: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email: username },
    })
    if (!(await this.bcryptService.compare(pass, userEntity!.password)))
      return null
    return new User({
      id: userEntity!.id,
      email: userEntity!.email,
      name: userEntity!.name,
      createdAt: userEntity!.createdAt,
      updatedAt: userEntity!.updatedAt,
      password: userEntity!.password,
    })
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    if (!userEntity) return null

    return new User({
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      password: userEntity.password,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { email } })
    if (!userEntity) return null

    return new User({
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      password: userEntity.password,
    })
  }

  async save(user: User): Promise<User> {
    const userEntity = this.userRepository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })

    const savedEntity = await this.userRepository
      .save(userEntity)
      .catch(error => {
        if (error.code === '23505') {
          throw AppError.emailAlreadyExists()
        }
        throw error
      })

    return new User({
      id: savedEntity.id,
      email: savedEntity.email,
      name: savedEntity.name,
      createdAt: savedEntity.createdAt,
      updatedAt: savedEntity.updatedAt,
    })
  }

  async update(user: User): Promise<User> {
    const userEntity = this.userRepository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })

    const updatedEntity = await this.userRepository.save(userEntity)

    return new User({
      id: updatedEntity.id,
      email: updatedEntity.email,
      name: updatedEntity.name,
      createdAt: updatedEntity.createdAt,
      updatedAt: updatedEntity.updatedAt,
      password: updatedEntity.password,
    })
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find()

    return userEntities.map(
      entity =>
        new User({
          id: entity.id,
          email: entity.email,
          name: entity.name,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          password: entity.password,
        }),
    )
  }
}
