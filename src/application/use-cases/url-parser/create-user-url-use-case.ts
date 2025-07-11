import { UserUrl } from '@domain/entities/user-url.entity'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUrlUseCase {
  constructor(private readonly userUrlRepository: IUserUrlRepository) {}

  async execute(url: string, userId: string) {
    return this.userUrlRepository.create(
      new UserUrl({
        url,
        userId,
      }),
    )
  }
}
