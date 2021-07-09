import axios from 'axios';
import { Injectable, Inject, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import Users from '../entities';
import { CheckToken } from 'src/Interceptors/CheckToken.interceptor';

@Injectable()
export class AuthService {
  // constructor(
  //   @Inject('AUTH_REPOSITORY')
  //   private authRepository: Repository<typeof Users>,
  // ) {}
  tokenVerification(headers): string {
    const { accessToken } = headers;

    //https://kapi.kakao.com/v2/user/me
    //db에 refreshtoken 저장
    return 'tokenVerification';
  }
}
