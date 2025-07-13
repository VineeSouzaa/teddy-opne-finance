import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetDuplicatedShortUrlsUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute() {
    return this.userUrlRepository.getDuplicatedShortUrls()
  }
}
