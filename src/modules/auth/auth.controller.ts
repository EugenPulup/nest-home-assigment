import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { UserService } from '@/modules/user/user.service';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const user = await this.userService.createUser(signUpDto);

    const accessToken = this.authService.generateAccessToken(user);

    return { accessToken };
  }
}
