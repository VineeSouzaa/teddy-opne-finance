import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApplicationModule } from './modules/application.module'
import { DatabaseModule } from './modules/database.module'
import { DomainModule } from './modules/domain.module'
import { InfrastructureModule } from './modules/infrastructure.module'
import { PresentationModule } from './modules/presentation.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DomainModule,
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
