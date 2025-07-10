import { Module } from '@nestjs/common'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'

@Module({
  providers: [CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase],
  exports: [CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase],
  imports: [InfrastructureModule],
})
export class ApplicationModule {}
