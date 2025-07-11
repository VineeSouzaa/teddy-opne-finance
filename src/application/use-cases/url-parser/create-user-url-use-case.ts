import { CreateUserUrlUseCaseDto } from '@application/dto/url-parser/create-ser-url-use-case.dto'
import { UserUrl } from '@domain/entities/user-url.entity'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUrlUseCase {
  constructor(private readonly userUrlRepository: IUserUrlRepository) {}

  async execute(createUserUrlUseCaseDto: CreateUserUrlUseCaseDto) {
    return this.userUrlRepository.create(
      new UserUrl({
        originalUrl: createUserUrlUseCaseDto.originalUrl,
        userId: createUserUrlUseCaseDto.userId,
        shortUrl: `${createUserUrlUseCaseDto.host}/${createUserUrlUseCaseDto.shortUrl}`,
      }),
    )
  }
}
