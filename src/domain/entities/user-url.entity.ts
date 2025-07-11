import { v4 as uuidv4 } from 'uuid'

interface IUserUrlProps {
  id?: string
  url: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
}

export class UserUrl {
  readonly id: string
  readonly active?: boolean
  readonly url: string
  readonly userId: string
  readonly createdAt?: Date
  readonly updatedAt?: Date

  constructor(private readonly props: IUserUrlProps) {
    this.id = props.id ?? uuidv4()
    this.active = props.active ?? true
    this.url = props.url
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  getId(): string {
    return this.id
  }

  getUrl(): string {
    return this.url
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
}
