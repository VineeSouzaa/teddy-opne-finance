import { User } from "@domain/entities/user.entity"

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  save(user: User): Promise<User>
  validatePassword(email: string, password: string): Promise<boolean>
}