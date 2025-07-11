import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserUrlCreateDto {
  @ApiProperty({
    description: 'The URL to parse',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsNotEmpty()
  url: string
}
