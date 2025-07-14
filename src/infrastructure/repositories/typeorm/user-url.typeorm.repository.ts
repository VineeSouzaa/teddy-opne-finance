import { GetOneUserUrlUseCaseDto } from '@application/dto/url-parser/get-one-user-url-use-case.dto'
import { UserUrl } from '@domain/entities/user-url.entity'
import { UpdateUserUrlRepositoryDto } from '@domain/ports/dto/user-url.repository.dto'
import { IUserUrlRepository } from '@domain/ports/user-url.repository'
import { UserUrlEntity } from '@infrastructure/entity/user-url-entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

@Injectable()
export class UserUrlTypeOrmRepository implements IUserUrlRepository {
  constructor(
    @InjectRepository(UserUrlEntity)
    private readonly userUrlRepository: Repository<UserUrlEntity>,
  ) {}
  async create(userUrl: UserUrl): Promise<UserUrl> {
    const created = await this.userUrlRepository.save({
      original_url: userUrl.originalUrl,
      user_id: userUrl.userId,
      short_url: userUrl.shortUrl,
      created_at: userUrl.createdAt,
      updated_at: userUrl.updatedAt,
      deleted_at: userUrl.deletedAt,
      active: userUrl.active,
    })
    return new UserUrl({
      id: created.id,
      originalUrl: created.original_url,
      shortUrl: created.short_url,
      userId: created.user_id,
      createdAt: created.created_at,
      updatedAt: created.updated_at,
      deletedAt: created.deleted_at,
      active: created.active,
    })
  }

  async findById(id: string): Promise<UserUrl> {
    const userUrl = await this.userUrlRepository.findOne({ where: { id } })
    if (!userUrl) {
      throw new Error('User URL not found')
    }
    return new UserUrl({
      id: userUrl.id,
      originalUrl: userUrl.original_url,
      shortUrl: userUrl.short_url,
      userId: userUrl.user_id,
      createdAt: userUrl.created_at,
      updatedAt: userUrl.updated_at,
      deletedAt: userUrl.deleted_at,
    })
  }

  async findAll(): Promise<UserUrl[]> {
    const userUrls = await this.userUrlRepository.find()
    return userUrls.map(
      userUrl =>
        new UserUrl({
          id: userUrl.id,
          originalUrl: userUrl.original_url,
          shortUrl: userUrl.short_url,
          userId: userUrl.user_id,
          createdAt: userUrl.created_at,
          updatedAt: userUrl.updated_at,
          deletedAt: userUrl.deleted_at,
        }),
    )
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
      .then(
        userUrl =>
          new UserUrl({
            id: userUrl!.id,
            originalUrl: userUrl!.original_url,
            shortUrl: userUrl!.short_url,
            userId: userUrl!.user_id,
            createdAt: userUrl!.created_at,
            updatedAt: userUrl!.updated_at,
            deletedAt: userUrl!.deleted_at,
          }),
      )
  }

  async delete(id: string): Promise<UserUrl> {
    const userUrl = await this.userUrlRepository.findOne({ where: { id } })
    if (!userUrl) {
      throw new Error('User URL not found')
    }
    await this.userUrlRepository.update(id, { deleted_at: new Date() })
    return new UserUrl({
      id: userUrl.id,
      originalUrl: userUrl.original_url,
      shortUrl: userUrl.short_url,
      userId: userUrl.user_id,
      createdAt: userUrl.created_at,
      updatedAt: userUrl.updated_at,
      deletedAt: userUrl.deleted_at,
    })
  }

  async getDuplicatedShortUrls(): Promise<UserUrl[]> {
    const userUrls = await this.userUrlRepository
      .createQueryBuilder('user_url')
      .select('user_url.short_url', 'short_url')
      .addSelect('COUNT(user_url.id)', 'count')
      .where('user_url.active = :active', { active: true })
      .andWhere('user_url.deletedAt IS NULL')
      .groupBy('user_url.short_url')
      .having('COUNT(id) > 1')
      .getRawMany()
    return userUrls.map(userUrl => new UserUrl(userUrl))
  }

  async findBy(
    getOneUserUrlUseCaseDto: GetOneUserUrlUseCaseDto,
  ): Promise<UserUrl[]> {
    if (
      Object.keys(getOneUserUrlUseCaseDto).every(
        key => !getOneUserUrlUseCaseDto[key],
      )
    ) {
      throw new Error('At least one filter is required')
    }

    const whereConditions: any = {}

    if (getOneUserUrlUseCaseDto.shortUrl) {
      whereConditions.shortUrl = Like(`%${getOneUserUrlUseCaseDto.shortUrl}%`)
    }
    if (getOneUserUrlUseCaseDto.originalUrl) {
      whereConditions.originalUrl = getOneUserUrlUseCaseDto.originalUrl
    }
    if (getOneUserUrlUseCaseDto.active !== undefined) {
      whereConditions.active = getOneUserUrlUseCaseDto.active
    }
    if (getOneUserUrlUseCaseDto.requestCount !== undefined) {
      whereConditions.requestCount = getOneUserUrlUseCaseDto.requestCount
    }
    if (getOneUserUrlUseCaseDto.userId) {
      whereConditions.userId = getOneUserUrlUseCaseDto.userId
    }

    const userUrl = await this.userUrlRepository.find({
      where: whereConditions,
    })

    if (!userUrl) {
      throw new Error('User URL not found')
    }
    return userUrl.map(
      userUrl =>
        new UserUrl({
          id: userUrl.id,
          originalUrl: userUrl.original_url,
          shortUrl: userUrl.short_url,
          userId: userUrl.user_id,
          createdAt: userUrl.created_at,
          updatedAt: userUrl.updated_at,
          deletedAt: userUrl.deleted_at,
        }),
    )
  }
}
