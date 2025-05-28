import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { User } from '@/modules/user/types';
import { UserRepository } from '@/modules/user/repositories/user.repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(payload: CreateUserDto): Promise<User> {
    return this.userRepository.create(payload);
  }

  public async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
