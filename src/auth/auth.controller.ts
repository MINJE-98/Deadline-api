import {
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CheckToken } from 'src/Interceptors/CheckToken.interceptor';
import { AuthService } from './auth.service';

@UseInterceptors(CheckToken)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   *  this controller todo
   * 1. 클라이언트의 accessToken 받아 검증하는 작업
   * 2. 새로운 accessToken 검증
   * 3.
   * 중복이 일어나는 함수
   * 1. 토큰 검증
   */

  //1. 클라이언트의 accessToken 받아 검증하는 작업
  @ApiOperation({ summary: '토큰 검증' })
  @Get('tokenVerification')
  tokenVerification(@Headers() headers): string {
    return this.authService.tokenVerification(headers);
  }
}
