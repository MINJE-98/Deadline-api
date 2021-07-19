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
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
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
      const savedUserinfo = await this.usersRepository.findOne({
        socialId: data.id,
      });
      if (!savedUserinfo) {
        const sortedData = {
          socialId: data.id,
          name: data.kakao_account.profile.nickname,
          profileUrl: data.kakao_account.profile.profile_image_url,
          email: data.kakao_account.email,
          createAt: now,
          updateAt: now,
          deleteAt: null,
        };
        request.headers = sortedData;
        return true;
      }
      request.headers = savedUserinfo;
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
