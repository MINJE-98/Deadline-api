import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';

// 토큰을 검증합니다.
@Injectable()
export class TokenCheck implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { accesstoken } = request.headers;
      // accesstoken 검증
      const accessTokenInfo = await axios.get(
        'https://kapi.kakao.com/v1/user/access_token_info',
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      if (+process.env.KAKAO_APPID != accessTokenInfo.data.appId) {
        throw new Error();
      }
      const userinfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      const sortedData = {
        id: userinfo.data.id,
        name: userinfo.data.kakao_account.profile.nickname,
        profileUrl: userinfo.data.kakao_account.profile.profile_image_url,
        email: userinfo.data.kakao_account.email,
      };
      request.headers = sortedData;
      return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          massage: '유효하지 않는 토큰입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
