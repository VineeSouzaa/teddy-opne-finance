import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ValidateUserPasswordUseCase } from '@application/use-cases/user/validate-user-password-use-case';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ValidateUserPasswordUseCase],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
