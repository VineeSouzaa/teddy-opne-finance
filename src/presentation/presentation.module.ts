import { AppService } from '@presentation/services/app.service'
import { Module } from '@nestjs/common'
import { AppController } from '@presentation/controllers/app.controller'
import { UserController } from '@presentation/controllers/user.controller'
import { ApplicationModule } from '@application/application.module'
import { AuthController } from '@presentation/controllers/auth.controller'

@Module({
  imports: [ApplicationModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class PresentationModule {}
