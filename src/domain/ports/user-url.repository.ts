import { GetOneUserUrlUseCaseDto } from '@application/dto/url-parser/get-one-user-url-use-case.dto'
import { UserUrl } from '@domain/entities/user-url.entity'
import { UpdateUserUrlRepositoryDto } from './dto/user-url.repository.dto'

export interface IUserUrlRepository {
  create(userUrl: UserUrl): Promise<UserUrl>
  findById(id: string): Promise<UserUrl>
  findAll(): Promise<UserUrl[]>
  update(
    updateUserUrlRepositoryDto: UpdateUserUrlRepositoryDto,
  ): Promise<UserUrl>
  delete(id: string): Promise<UserUrl>
  getDuplicatedShortUrls(): Promise<UserUrl[]>
  findBy(getOneUserUrlUseCaseDto: GetOneUserUrlUseCaseDto): Promise<UserUrl[]>
}
