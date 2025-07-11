import { UserEntity } from '@domain/entities/user.entity'

export const IUserRepositorySymbol = Symbol('IUserRepository')

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  save(user: UserEntity): Promise<UserEntity>
  update(user: UserEntity): Promise<UserEntity>
  delete(id: string): Promise<void>
  findAll(): Promise<UserEntity[]>
  validatePassword(username: string, pass: string): Promise< UserEntity | null>
}