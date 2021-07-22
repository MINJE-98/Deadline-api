import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenCheck } from 'src/auth/token.check.guard';
import { UserInfo } from 'src/common/decorator';
import { TokenAuthError } from 'src/common/dto';
import { TeamMembers, Users } from 'src/entities';
import { TeamMembersCreate } from 'src/team-members/dto/teamMembersCreate.dto';
import { TeamMembersUpdate } from 'src/team-members/dto/teamMembersUpdate.dto';
import { TeamMembersService } from './team-members.service';

@UseGuards(TokenCheck)
@ApiTags('TeamMembers')
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
@Controller('teams')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post(':teamid/teamMembers')
  @ApiOperation({
    summary: '팀에 유저 초대',
    description: '팀에 유저 초대합니다.',
  })
  @ApiBody({
    required: true,
    type: TeamMembersCreate,
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  createTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Body('email') email: string,
    @UserInfo('id') id: number,
  ) {
    return this.teamMembersService.createTeamMembers(teamid, email, id);
  }

  @Get(':teamid/teamMembers')
  @ApiOperation({
    summary: '팀에 가입된 유저 조회',
    description: '팀에 가입된 유저를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  getTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
  ) {
    return this.teamMembersService.getTeamMembers(teamid);
  }

  @Patch(':teamid/teamMembers')
  @ApiOperation({
    summary: '팀에 가입한 유저 수정',
    description: '팀에 가입된 유저 정보 상태 변경합니다.',
  })
  @ApiBody({
    required: true,
    type: TeamMembersUpdate,
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  updateTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Body('state') state: number,
    @Query('mid') mid: number,
    @UserInfo('id') id: number,
  ) {
    return this.teamMembersService.updateTeamMembers(teamid, state, mid, id);
  }

  @Delete(':teamid/teamMembers')
  @ApiOperation({
    summary: '팀 탈퇴',
    description: '유저가 팀에서 탈퇴합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  deleteTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @UserInfo('id') id: number,
  ) {
    return this.teamMembersService.deleteTeamMembers(teamid, id);
  }
  @Delete(':teamid/teamMembers/:email')
  @ApiOperation({
    summary: '팀에서 추방',
    description: '팀에서 해당 멤버를 팀에서 추방합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  deleteTeamSpecialMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Param('email') email: string,
    @UserInfo('id') id: number,
  ) {
    return this.teamMembersService.deleteTeamSpecialMembers(teamid, email, id);
  }
}
