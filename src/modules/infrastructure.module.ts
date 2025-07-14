import { IUserUrlRepositoryToken } from '@domain/ports/user-url.repository'
import { IUserRepositoryToken } from '@domain/ports/user.repository'
import { UserEntity } from '@infrastructure/entity/user-entity'
import { UserUrlEntity } from '@infrastructure/entity/user-url-entity'
import { UserUrlTypeOrmRepository } from '@infrastructure/repositories/typeorm/user-url.typeorm.repository'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    // DomainModule,
    // ApplicationModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity, UserUrlEntity]),
  ],
  providers: [
    {
      provide: IUserUrlRepositoryToken,
      useClass: UserUrlTypeOrmRepository,
    },
    {
      provide: IUserRepositoryToken,
      useClass: UserTypeOrmRepository,
    },
    // UserTypeOrmRepository,
    // UserUrlTypeOrmRepository,
    {
      provide: 'BcryptService',
      useValue: {
        hash,
        compare,
      },
    },
    JwtService,
  ],
  exports: [
    IUserUrlRepositoryToken,
    IUserRepositoryToken,
    // 'IUserRepository',
    // 'IUserUrlRepository',
    JwtService, // TODO: make application interface for jwt service
    'BcryptService',
  ],
})
export class InfrastructureModule {}
