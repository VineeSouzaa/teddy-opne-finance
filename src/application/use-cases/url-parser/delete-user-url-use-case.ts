import { DeleteUserUrlUseCaseDto } from '@application/dto/url-parser/delete-user-url-use-case.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteUserUrlUseCase {
  constructor(
    @Inject('IUserUrlRepository')
    private readonly userUrlRepository: IUserUrlRepository,
  ) {}

  async execute(deleteUserUrlUseCaseDto: DeleteUserUrlUseCaseDto) {
    return this.userUrlRepository.delete(deleteUserUrlUseCaseDto.id)
  }
}
