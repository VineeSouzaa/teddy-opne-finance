import { v4 as uuidv4 } from 'uuid'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

interface UserProps {
  id?: string
  email: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  readonly email: string

  @Column()
  readonly name: string

  @Column()
  readonly createdAt?: Date

  @Column()
  readonly updatedAt?: Date

  constructor({
    id,
    email,
    name,
    createdAt,
    updatedAt,
  }: UserProps) {
    this.id = id ?? uuidv4()
    this.email = email
    this.name = name
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = updatedAt ?? new Date()

    this.validate()
  }

  getId(): string {
    return this.id
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }
  }

  validate(): void {
    this.validateEmail(this.email)
    this.validateName(this.name)
  }
}
