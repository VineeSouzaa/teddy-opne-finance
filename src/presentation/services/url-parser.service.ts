import { CreateUserUrlUseCase } from '@application/use-cases/url-parser/create-user-url-use-case'
import { User } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UrlParserService {
  constructor(private readonly createUserUrlUseCase: CreateUserUrlUseCase) {}

  parseUrl(url: string, user: User) {
    if (user) {
      return this.createUserUrlUseCase.execute(url, user.id)
    }
    return url
  }
}
