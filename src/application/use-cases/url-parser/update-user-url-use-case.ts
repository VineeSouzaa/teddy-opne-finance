import { UpdateUserUrlUseCaseDto } from '@application/dto/url-parser/update-user-url-use-case.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(updateUserUrlUseCaseDto: UpdateUserUrlUseCaseDto) {
    return this.userUrlRepository.update(updateUserUrlUseCaseDto)
  }
}
