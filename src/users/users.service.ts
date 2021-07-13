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
    try {
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
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findUser(socialId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { socialId },
        select: [
          'id',
          'socialId',
          'name',
          'profileUrl',
          'email',
          'createAt',
          'updateAt',
          'deleteAt',
        ],
      });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: '존재하지않는 유저입니다.',
          },
          HttpStatus.NOT_FOUND,
        );
      } else return user;
    } catch (error) {
      return error;
    }
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
    try {
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
        const result = await this.usersRepository.delete(user);
        throw new HttpException(
          {
            status: HttpStatus.OK,
            error: '유저 삭제 성공',
          },
          HttpStatus.OK,
        );
      }
    } catch (error) {
      return error;
    }
  }
}
