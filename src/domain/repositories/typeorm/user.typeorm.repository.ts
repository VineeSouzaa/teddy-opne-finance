import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'

@Injectable()
export class UserTypeOrmRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super()
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } })
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user)
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user)
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
