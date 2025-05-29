import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UserRepository } from '@/modules/user/repositories/user.repositories';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(payload: CreateUserDto): Promise<UserEntity> {
    const data = await this.userRepository.create(payload);

    return new UserEntity(data);
  }

  public async findUserById(id: number): Promise<UserEntity> {
    const data = await this.userRepository.findById(id);

    if (!data) throw new NotFoundException('User not found');

    return new UserEntity(data);
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    const data = await this.userRepository.findByEmail(email);

    if (!data) throw new NotFoundException('User not found');

    return new UserEntity(data);
  }
}
