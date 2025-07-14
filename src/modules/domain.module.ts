import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [
    // {
    //   provide: 'IUserUrlRepository',
    //   useClass: AbstractUserUrlRepository,
    // },
    // {
    //   provide: 'IUserUrlRepository',
    //   useClass: UserUrlTypeOrmRepository,
    // },
    // {
    //   provide: 'IUserRepository',
    //   useClass: UserTypeOrmRepository,
    // },
  ],
  exports: [
    // 'IUserUrlRepository',
    // 'IUserRepository',
    // AbstractUserUrlRepository,
  ],
})
export class DomainModule {}
