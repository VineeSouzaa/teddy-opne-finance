import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'
import { UserCreateDto } from '@presentation/dto/user/user-create-dto'
import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('BcryptService') private readonly bcryptService: typeof bcrypt,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: UserCreateDto) {
    return this.createUserUseCase.execute({
      email: user.email,
      name: user.name,
      password: await this.bcryptService.hash(user.password, 10),
    })
  }
}
