import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { User } from '@domain/entities/user.entity'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() user: User) {
    return this.createUserUseCase.execute(user)
  }
}
