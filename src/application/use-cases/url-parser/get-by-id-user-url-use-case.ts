import { GetUserUrlUseCaseDto } from '@application/dto/url-parser/get-user-url-use-case.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetByIdUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(getUserUrlUseCaseDto: GetUserUrlUseCaseDto) {
    const userUrl = await this.userUrlRepository.findById(
      getUserUrlUseCaseDto.id,
    )
    await this.userUrlRepository.update({
      id: getUserUrlUseCaseDto.id,
      requestCount: userUrl.requestCount + 1,
    })
    return userUrl
  }
}
