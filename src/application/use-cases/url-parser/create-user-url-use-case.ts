import { CreateUserUrlUseCaseDto } from '@application/dto/url-parser/create-ser-url-use-case.dto'
import { UserUrl } from '@domain/entities/user-url.entity'
import {
  IUserUrlRepository,
  IUserUrlRepositoryToken,
} from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUrlUseCase {
  constructor(
    @Inject(IUserUrlRepositoryToken)
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(createUserUrlUseCaseDto: CreateUserUrlUseCaseDto) {
    const user = new UserUrl({
      originalUrl: createUserUrlUseCaseDto.originalUrl,
      userId: createUserUrlUseCaseDto.userId,
      shortUrl: `${createUserUrlUseCaseDto.host}/${createUserUrlUseCaseDto.shortUrl}`,
    })

    return this.userUrlRepository.create(user)
  }
}
