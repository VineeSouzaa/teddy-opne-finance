import { Module } from '@nestjs/common'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { DatabaseModule } from './database.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@infrastructure/entity/user-entity'

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
    UserTypeOrmRepository
  ],
  exports: ['IUserRepository'],
})
export class InfrastructureModule {}