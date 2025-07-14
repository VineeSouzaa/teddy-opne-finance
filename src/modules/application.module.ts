import { UrlShortenerService } from '@application/services/url-sorter.service'
import { CreateUserUrlUseCase } from '@application/use-cases/url-parser/create-user-url-use-case'
import { DeleteUserUrlUseCase } from '@application/use-cases/url-parser/delete-user-url-use-case'
import { GetAllUserUrlUseCase } from '@application/use-cases/url-parser/get-all-user-url-use-case'
import { GetByFilterUserUrlUseCase } from '@application/use-cases/url-parser/get-by-filter-user-url-use-case'
import { GetByIdUserUrlUseCase } from '@application/use-cases/url-parser/get-by-id-user-url-use-case'
import { GetDuplicatedShortUrlsUseCase } from '@application/use-cases/url-parser/get-duplicated-short-urls-use-case'
import { UpdateUserUrlUseCase } from '@application/use-cases/url-parser/update-user-url-use-case'
import { CreateUserUseCase } from '@application/use-cases/user/create-user-use-case'
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users-use-case'
import { GetUserUseCase } from '@application/use-cases/user/get-user-use-case'
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case'
import {
  IUserUrlRepository,
  IUserUrlRepositoryToken,
} from '@domain/ports/user-url.repository'
import { Module } from '@nestjs/common'
import { DomainModule } from './domain.module'
import { InfrastructureModule } from './infrastructure.module'

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [
    // {
    //   provide: CreateUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) => new CreateUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: ValidateUserPasswordUseCase,
    //   useFactory: (repo: IUserRepository) =>
    //     new ValidateUserPasswordUseCase(repo),
    //   inject: ['IUserRepository'],
    // },
    // {
    //   provide: CreateUserUseCase,
    //   useFactory: (repo: IUserRepository) => new CreateUserUseCase(repo),
    //   inject: ['IUserRepository'],
    // },
    // {
    //   provide: GetAllUsersUseCase,
    //   useFactory: (repo: IUserRepository) => new GetAllUsersUseCase(repo),
    //   inject: ['IUserRepository'],
    // },
    // {
    //   provide: GetUserUseCase,
    //   useFactory: (repo: IUserRepository) => new GetUserUseCase(repo),
    //   inject: ['IUserRepository'],
    // },
    // {
    //   provide: UpdateUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) => new UpdateUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: DeleteUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) => new DeleteUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: GetByIdUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) => new GetByIdUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: GetByFilterUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) =>
    //     new GetByFilterUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: GetDuplicatedShortUrlsUseCase,
    //   useFactory: (repo: IUserUrlRepository) =>
    //     new GetDuplicatedShortUrlsUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    // {
    //   provide: GetAllUserUrlUseCase,
    //   useFactory: (repo: IUserUrlRepository) => new GetAllUserUrlUseCase(repo),
    //   inject: ['IUserUrlRepository'],
    // },
    {
      provide: CreateUserUrlUseCase,
      useFactory: (repo: IUserUrlRepository) => new CreateUserUrlUseCase(repo),
      inject: [IUserUrlRepositoryToken],
    },
    ValidateUserPasswordUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserUseCase,
    UpdateUserUrlUseCase,
    DeleteUserUrlUseCase,

    GetByIdUserUrlUseCase,
    GetAllUserUrlUseCase,
    GetByFilterUserUrlUseCase,
    GetDuplicatedShortUrlsUseCase,
    UrlShortenerService,
  ],
  exports: [
    CreateUserUrlUseCase,
    ValidateUserPasswordUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserUseCase,
    UpdateUserUrlUseCase,
    DeleteUserUrlUseCase,

    GetByIdUserUrlUseCase,
    GetAllUserUrlUseCase,
    GetByFilterUserUrlUseCase,
    GetDuplicatedShortUrlsUseCase,
    UrlShortenerService,
  ],
})
export class ApplicationModule {}
