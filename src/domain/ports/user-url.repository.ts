import { UserUrl } from '@domain/entities/user-url.entity'

export interface IUserUrlRepository {
  create(userUrl: UserUrl): Promise<UserUrl>
}
