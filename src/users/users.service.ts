import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async createUser(userinfo: Users) {
    const user = await this.usersRepository.findOne({
      where: [userinfo.socialId],
      select: ['id'],
    });

    if (!user) {
      return await this.usersRepository.save(userinfo);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '이미 존재하는 유저입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findUser(socialId: number) {
    const user = await this.usersRepository.findOne({
      where: { socialId },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '해당 유저는 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    } else return user;
  }

  // async updateUser(socialId: number) {
  //   try {
  //     const user = await this.findUser(socialId);
  //   } catch (error) {
  //     console.log(error);
  //     return '유저 수정 실패';
  //   }
  // }

  async removeUser(socialId: number) {
    console.log(socialId);

    const user = await this.usersRepository.findOne({
      where: { socialId },
      select: ['id'],
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '존재하지않는 유저입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.usersRepository.remove(user);
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '유저 삭제 성공',
        },
        HttpStatus.OK,
      );
    }
  }
}
