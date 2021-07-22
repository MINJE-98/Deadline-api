import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';
import { UsersUpdate } from './dto/usersUpdate.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async createUsers(userinfo: Users) {
    const isExist = await this.findUsers(userinfo.id);
    if (isExist == undefined) {
      const now = new Date();
      userinfo.createdAt = now;
      userinfo.updatedAt = now;
      return await this.usersRepository.save(userinfo);
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '이미등록된 유저입니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findUsers(id: number) {
    return await this.usersRepository.findOne({ id: id });
  }

  async updateUsers(id: number, updatedUserinfo: UsersUpdate) {
    const userinfo = await this.findUsers(id);
    if (userinfo != undefined) {
      const { profileUrl, name } = updatedUserinfo;
      const now = new Date();
      userinfo.profileUrl = profileUrl ? profileUrl : userinfo.profileUrl;
      userinfo.name = name ? name : userinfo.name;
      userinfo.updatedAt = now;
      return await this.usersRepository.save(userinfo);
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '유저가 존재하지 않습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async removeUser(id: number) {
    const { affected } = await this.usersRepository.delete({ id: id });
    if (affected) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: '회원 탈퇴가 완료되었습니다.',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: '회원 탐퇴를 실패하였습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
