import { Module } from '@nestjs/common'
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
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
