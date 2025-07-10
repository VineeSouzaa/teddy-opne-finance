import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { UserEntity } from '@infrastructure/entities/user.entity'
import { RepositoryServiceLocator } from '@domain/repositories/service-locator'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserTypeOrmRepository],
  exports: [],
})
export class InfrastructureModule implements OnModuleInit {
  constructor(private readonly userTypeOrmRepository: UserTypeOrmRepository) {}

  onModuleInit() {
    RepositoryServiceLocator.getInstance().setUserRepository(this.userTypeOrmRepository)
  }
}
