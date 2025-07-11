import { UserEntity } from '@infrastructure/entity/user-entity'
import { UserUrlEntity } from '@infrastructure/entity/user-url-entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'teddy_user',
      password: process.env.DB_PASSWORD || 'teddy_password',
      database: process.env.DB_NAME || 'teddy_finance',
      entities: [UserEntity, UserUrlEntity],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
