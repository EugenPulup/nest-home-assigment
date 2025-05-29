import { BadRequestException, Injectable } from '@nestjs/common';

import { TokenService } from '@/modules/token/token.service';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { UserRepository } from '@/modules/user/repositories/user.repositories';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { AuthUtils } from '@/modules/auth/auth.utils';
import { ConfigService } from '@/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public generateAccessToken(user: UserEntity) {
    return this.tokenService.createAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  }

  public getAuthResponse(user: UserEntity) {
    const accessToken = this.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  public async signup(dto: SignUpDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.userService.createUser({
      ...dto,
      password: await AuthUtils.hashPassword(
        dto.password,
        this.configService.getAuthConfig().SALT_ROUNDS,
        this.configService.getAuthConfig().PEPPER,
      ),
    });

    const accessToken = this.generateAccessToken(user);

    return { accessToken };
  }

  public async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await AuthUtils.verifyPassword(
      dto.password,
      user.password,
      this.configService.getAuthConfig().PEPPER,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.getAuthResponse(user);
  }

  public extractTokenFromBearerHeader(bearerToken: string) {
    const parts = bearerToken.split(' ');
    const bearer = parts[0];
    const token = parts[1];

    if (bearer !== 'Bearer') {
      throw new BadRequestException('Wrong token format');
    }

    return token;
  }
}
