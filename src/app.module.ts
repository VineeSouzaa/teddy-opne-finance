import { Module } from '@nestjs/common'
import { AppController } from '@presentation/controllers/app.controller'
import { AppService } from '@application/services/app.service'
import { ConfigModule } from '@nestjs/config'
import { DomainModule } from '@domain/domain.module'
import { ApplicationModule } from '@application/application.module'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { PresentationModule } from '@presentation/presentation.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
