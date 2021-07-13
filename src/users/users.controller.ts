import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Query,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenCheck } from 'src/auth/token.check.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Token } from 'src/common/dto';
import { AccessToken, SocialId } from '../common/dto';
import { Users } from '../entities/Users';
import { UsersService } from './users.service';

@UseGuards(TokenCheck)
@ApiTags('Users')
@ApiResponse({
  status: 404,
  description: '유효한 토큰이 아닙니다.',
  type: Token,
})
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
  @ApiResponse({ status: 201, description: '유저 생성 성공', type: Users })
  createUser(@Headers() AccessToken: AccessToken, @User() userinfo: Users) {
    return this.usersService.createUser(userinfo);
  }

  @Get(':socialId')
  @ApiOperation({ summary: '유저 조회', description: '유저를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  findUser(
    @Headers() AccessToken: AccessToken,
    @Param('socialId') socialId: number,
  ) {
    return this.usersService.findUser(socialId);
  }

  // @Patch(':socialId')
  // @ApiOperation({ summary: '유저 수정', description: '유저를 수정합니다' })
  // @ApiResponse({ status: 200, description: '성공', type: Users })
  // updateUser(
  //   @Headers() token: Token,
  //   @Param('socialId') socialId: number,
  //   @Body() body: Users,
  // ) {
  //   return this.usersService.updateUser(socialId);
  // }

  @Delete(':socialId')
  @ApiOperation({ summary: '유저 삭제', description: '유저를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Users })
  removeUser(
    @Headers() AccessToken: AccessToken,
    @Param('socialId') socialId: number,
  ) {
    return this.usersService.removeUser(socialId);
  }
}
