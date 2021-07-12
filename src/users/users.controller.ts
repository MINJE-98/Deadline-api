import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Request,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { request } from 'express';
import { TokenCheck } from 'src/auth/token.check.guard';
import { Token } from '../common/dto';
import { Users } from '../entities/Users';
import { UsersService } from './users.service';

@UseGuards(TokenCheck)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * TODO
   *   CRUD
   *
   */
  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저를 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  @ApiResponse({ status: 500, description: '서버에러' })
  createUser(@Headers() query: Token, @Request() res: any) {
    // console.log(user);
    return this.usersService.createUser(res);
  }

  @Get(':userid')
  @ApiOperation({ summary: '유저 조회', description: '유저를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  findUser(@Param('userid') userid: string) {
    return this.usersService.findUser(+userid);
  }

  @Patch(':userid')
  @ApiOperation({ summary: '유저 수정', description: '유저를 수정합니다' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  updateUser(@Param('userid') userid: string) {
    return this.usersService.updateUser(+userid);
  }

  @Delete(':userid')
  @ApiOperation({ summary: '유저 삭제', description: '유저를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  removeUser(@Param('userid') userid: string) {
    return this.usersService.removeUser(+userid);
  }
}
