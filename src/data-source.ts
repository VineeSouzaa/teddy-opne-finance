import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { UserEntity } from './infrastructure/entity/user-entity'
import { UserUrlEntity } from './infrastructure/entity/user-url-entity'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'teddy_user',
  password: process.env.DB_PASSWORD || 'teddy_password',
  database: process.env.DB_NAME || 'teddy_finance',
  entities: [UserEntity, UserUrlEntity],
  migrations: ['src/migrations/*.ts'],
  ssl: process.env.NODE_ENV === 'production',
  extra:
    process.env.NODE_ENV === 'production'
      ? { ssl: { rejectUnauthorized: false } }
      : {},
})
