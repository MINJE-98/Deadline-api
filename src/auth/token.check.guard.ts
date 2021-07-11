import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';

// 토큰을 검증합니다.
@Injectable()
export class TokenCheck implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { accesstoken } = request.headers;
      const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      request.body = data;
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
