import { Module } from '@nestjs/common'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { UserTypeOrmRepository } from '@infrastructure/repositories/typeorm/user.typeorm.repository'
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UserRepository],
})
export class InfrastructureModule {}
