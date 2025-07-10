import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { UserCreateDto } from '@application/dto/user/user-create-dto'

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: UserCreateDto) {
    return this.createUserUseCase.execute(user)
  }
}
