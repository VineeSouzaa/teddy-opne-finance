export abstract class UpdateUserUrlUseCaseDto {
  id: string
  originalUrl?: string
  shortUrl?: string
  active?: boolean
}
