import { User } from '@domain/entities/user.entity'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
  update(user: User): Promise<User>
  delete(id: string): Promise<void>
  findAll(): Promise<User[]>
  validatePassword(username: string, pass: string): Promise< User | null>
} 