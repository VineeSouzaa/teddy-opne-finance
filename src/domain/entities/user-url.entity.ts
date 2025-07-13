import { v4 as uuidv4 } from 'uuid'

interface IUserUrlProps {
  id?: string
  originalUrl: string
  shortUrl: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
  deletedAt?: Date
}

export class UserUrl {
  readonly id: string
  readonly active?: boolean
  readonly originalUrl: string
  readonly shortUrl: string
  readonly userId: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
  readonly deletedAt?: Date

  constructor(private readonly props: IUserUrlProps) {
    this.id = props.id ?? uuidv4()
    this.active = props.active ?? true
    this.originalUrl = props.originalUrl
    this.shortUrl = props.shortUrl
    this.userId = props.userId
    this.createdAt = props.createdAt ?? new Date()
    this.updatedAt = props.updatedAt ?? new Date()
    this.deletedAt = props.deletedAt
  }

  getId(): string {
    return this.id
  }

  getOriginalUrl(): string {
    return this.originalUrl
  }

  getShortUrl(): string {
    return this.shortUrl
  }

  getUserId(): string {
    return this.userId
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }

  getDeletedAt(): Date | undefined {
    return this.deletedAt
  }
}
