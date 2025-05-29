import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { PasswordResetRequestDto } from '@/modules/auth/dto/password-reset-request.dto';
import { PasswordResetDto } from '@/modules/auth/dto/password-reset.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('reset/request')
  request(@Body() dto: PasswordResetRequestDto) {
    return this.authService.requestPasswordReset(dto);
  }

  @Post('reset/confirm')
  confirm(@Body() dto: PasswordResetDto) {
    return this.authService.confirmPasswordReset(dto);
  }
}
