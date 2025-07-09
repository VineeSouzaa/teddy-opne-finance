import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/repositories/abstract/user.repository.abstract';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}