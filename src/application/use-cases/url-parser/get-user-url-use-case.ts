import { GetUserUrlUseCaseDto } from '@application/dto/url-parser/get-user-url-use-case.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(getUserUrlUseCaseDto: GetUserUrlUseCaseDto) {
    return this.userUrlRepository.findById(getUserUrlUseCaseDto.id)
  }
}
