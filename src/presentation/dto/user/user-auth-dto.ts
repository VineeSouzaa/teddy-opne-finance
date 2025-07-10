import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserAuthDto {
    @IsString()
    @IsNotEmpty()
    password: string
}