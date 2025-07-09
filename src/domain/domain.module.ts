import { Module } from '@nestjs/common';
import { User } from '@domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract';
import { UserTypeOrmRepository } from '@domain/repositories/typeorm/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  
  providers: [
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UserRepository],
})
export class DomainModule {}