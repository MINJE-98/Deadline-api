import { Injectable } from '@nestjs/common';
import { Token, Users } from 'src/entities';

@Injectable()
export class UsersService {
  createUser(res: any) {
    const { id } = res.body;
    console.log(res);

    // 유저 등록
    return `유저 생성 성공! `;
  }

  findUser(id: number) {
    // 유저 검색
    return `This action returns a #${id} user`;
  }

  updateUser(id: number) {
    // 유저 수정
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    // 유저 삭제
    return `This action removes a #${id} user`;
  }
}
