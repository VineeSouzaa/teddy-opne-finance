import { UserUrl } from '@domain/entities/user-url.entity'
import { UpdateUserUrlRepositoryDto } from '@domain/ports/dto/user-url.repository.dto'
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

  async findById(id: string): Promise<UserUrl> {
    const userUrl = await this.userUrlRepository.findOne({ where: { id } })
    if (!userUrl) {
      throw new Error('User URL not found')
    }
    return new UserUrl(userUrl)
  }

  async findAll(): Promise<UserUrl[]> {
    const userUrls = await this.userUrlRepository.find()
    return userUrls.map(userUrl => new UserUrl(userUrl))
  }

  async update(
    updateUserUrlRepositoryDto: UpdateUserUrlRepositoryDto,
  ): Promise<UserUrl> {
    const userUrl = await this.userUrlRepository.update(
      { id: updateUserUrlRepositoryDto.id },
      updateUserUrlRepositoryDto,
    )

    if (!userUrl) {
      throw new Error('User URL not found')
    }

    return await this.userUrlRepository
      .findOne({
        where: { id: updateUserUrlRepositoryDto.id },
      })
      .then(userUrl => new UserUrl(userUrl!))
  }

  async delete(id: string): Promise<UserUrl> {
    const userUrl = await this.userUrlRepository.findOne({ where: { id } })
    if (!userUrl) {
      throw new Error('User URL not found')
    }
    await this.userUrlRepository.update(id, {
      active: false,
      deletedAt: new Date(),
    })
    return new UserUrl(userUrl)
  }
}
