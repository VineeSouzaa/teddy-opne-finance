import { AppService } from '@presentation/services/app.service'
import { Module } from '@nestjs/common'
import { AppController } from '@presentation/controllers/app.controller'
import { UserController } from '@presentation/controllers/user.controller'
import { ApplicationModule } from '@application/application.module'

@Module({
  imports: [ApplicationModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class PresentationModule {}
