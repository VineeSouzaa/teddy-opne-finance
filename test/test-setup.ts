import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppModule } from '../src/app.module'

export class TestApp {
  private app: INestApplication

  async createApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        AppModule,
      ],
    })
      .overrideModule(TypeOrmModule)
      .useModule(
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST', 'localhost'),
            port: configService.get('DB_PORT', 5432),
            username: configService.get('DB_USERNAME', 'test_user'),
            password: configService.get('DB_PASSWORD', 'test_password'),
            database: configService.get('DB_NAME', 'teddy_finance_test'),
            entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
            synchronize: true,
            dropSchema: true,
          }),
          inject: [ConfigService],
        }),
      )
      .compile()

    this.app = moduleFixture.createNestApplication()
    await this.app.init()
    return this.app
  }

  async closeApp(): Promise<void> {
    if (this.app) {
      await this.app.close()
    }
  }

  getApp(): INestApplication {
    return this.app
  }
}

export const createTestApp = async (): Promise<INestApplication> => {
  const testApp = new TestApp()
  return await testApp.createApp()
}
