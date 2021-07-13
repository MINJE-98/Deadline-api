import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Users } from 'src/entities';

// 토큰을 검증합니다.
@Injectable()
export class TokenCheck implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { accesstoken } = request.headers;
      const now = new Date();
      const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      const sortedData = {
        socialId: data.id,
        name: data.kakao_account.profile.nickname,
        profileUrl: data.kakao_account.profile.profile_image_url,
        email: data.kakao_account.email,
        createAt: now,
        updateAt: now,
        deleteAt: null,
      };
      request.body = sortedData;
      return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '유효하지 않는 토큰입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
