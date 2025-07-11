import { User } from '@domain/entities/user.entity'

export class UrlParserServiceDto {
  url: string
  user: User
  host: string
}
