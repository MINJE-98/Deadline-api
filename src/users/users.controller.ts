import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Headers,
  Query,
  Body,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenCheck } from 'src/auth/token.check.guard';
import { UserInfo } from 'src/common/decorator';
import { TokenAuthError } from 'src/common/dto';
import { Users } from '../entities/Users';
import { UsersUpdate } from './dto/usersUpdate.dto';
import { UsersService } from './users.service';

@UseGuards(TokenCheck)
@ApiTags('Users')
@ApiHeader({
  name: 'accesstoken',
  required: true,
  description: '토큰',
})
@ApiResponse({
  status: 404,
  description: '유효한 토큰이 아닙니다.',
  type: TokenAuthError,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '유저 생성', description: '유저를 생성합니다.' })
  @ApiResponse({ status: 200, description: '유저 생성 성공', type: Users })
  @Post()
  createUsers(
    @Headers('accesstoken') AccessToken,
    @UserInfo() userinfo: Users,
  ) {
    return this.usersService.createUsers(userinfo);
  }
  @ApiOperation({ summary: '유저 조회', description: '유저를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  @Get()
  findUsers(@Headers('accesstoken') AccessToken, @UserInfo('id') id: number) {
    return this.usersService.findUsers(id);
  }

  @ApiOperation({ summary: '유저 수정', description: '유저를 수정합니다' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  @Patch()
  updateUsers(
    @Headers('accesstoken') AccessToken,
    @UserInfo('id') id: number,
    @Body() updateUserinfo: UsersUpdate,
  ) {
    return this.usersService.updateUsers(id, updateUserinfo);
  }

  @Delete()
  @ApiOperation({ summary: '회원 탈퇴', description: '회원 탈퇴합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  removeUser(@Headers('accesstoken') AccessToken, @UserInfo('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
