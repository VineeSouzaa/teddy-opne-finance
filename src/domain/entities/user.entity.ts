import { AppError } from '@shared/utils/app-errors'
import { v4 as uuidv4 } from 'uuid'

interface UserProps {
  id?: string
  email: string
  name: string
  createdAt?: Date
  updatedAt?: Date
  password?: string
  active?: boolean
  deletedAt?: Date
}

export class User {
  readonly id: string
  readonly active?: boolean
  readonly email: string

  readonly name: string

  readonly createdAt?: Date

  readonly updatedAt?: Date

  readonly deletedAt?: Date

  readonly password: string

  constructor(props?: UserProps) {
    this.id = props?.id ?? uuidv4()
    this.email = props?.email ?? ''
    this.name = props?.name ?? ''
    this.createdAt = props?.createdAt ?? new Date()
    this.updatedAt = props?.updatedAt ?? new Date()
    this.password = props?.password ?? ''
    this.active = props?.active ?? true
    this.deletedAt = props?.deletedAt
    if (props) {
      this.validate()
    }
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

  getPassword(): string {
    return this.password
  }

  getActive(): boolean | undefined {
    return this.active
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw AppError.invalidEmailFormat()
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw AppError.nameTooShort()
    }
  }

  validate(): void {
    this.validateEmail(this.email)
    this.validateName(this.name)
  }

  getDeletedAt(): Date | undefined {
    return this.deletedAt
  }
}
