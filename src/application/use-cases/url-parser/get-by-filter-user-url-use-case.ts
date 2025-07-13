import { GetOneUserUrlUseCaseDto } from '@application/dto/url-parser/get-one-user-url-use-case.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetByFilterUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(getOneUserUrlUseCaseDto: GetOneUserUrlUseCaseDto) {
    return this.userUrlRepository.findBy(getOneUserUrlUseCaseDto)
  }
}
