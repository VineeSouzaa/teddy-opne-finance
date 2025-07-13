import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetAllUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute() {
    return this.userUrlRepository.findAll()
  }
}
