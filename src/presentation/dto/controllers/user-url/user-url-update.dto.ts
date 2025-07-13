import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UserUrlUpdateDto {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsOptional()
  originalUrl?: string

  @ApiProperty({
    description: 'The short URL',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsOptional()
  shortUrl?: string

  @ApiProperty({
    description: 'The active status',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean
}
