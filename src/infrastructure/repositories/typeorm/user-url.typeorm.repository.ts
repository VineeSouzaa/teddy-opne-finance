import { UserUrl } from '@domain/entities/user-url.entity'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { UserUrlEntity } from '@infrastructure/entity/user-url-entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserUrlTypeOrmRepository implements IUserUrlRepository {
  constructor(
    @InjectRepository(UserUrlEntity)
    private readonly userUrlRepository: Repository<UserUrlEntity>,
  ) {}
  create(userUrl: UserUrl): Promise<UserUrl> {
    return this.userUrlRepository.save(userUrl)
  }
}
