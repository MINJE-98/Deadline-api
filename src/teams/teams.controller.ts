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
import { TokenAuthError, TeamsUpdate, TeamMembersUpdate } from '../common/dto';
import { UserInfo } from 'src/common/decorator';
import { TeamMembers, Teams, Users } from 'src/entities';
import { TeamsService } from './teams.service';

@UseGuards(TokenCheck)
@ApiTags('Teams')
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
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post(':teamname')
  @ApiOperation({ summary: '팀 생성', description: '팀을 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  createTeam(
    @Headers('accessToken') AccessToken,
    @UserInfo() userinfo,
    @Param('teamname') teamname: string,
  ) {
    return this.teamsService.createTeam(userinfo, teamname);
  }

  @Get('teamname/:teamname')
  @ApiOperation({
    summary: '팀명으로 팀을 조회',
    description: '팀명으로 팀을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  findTeamFromName(
    @Headers('accessToken') AccessToken,
    @Param('teamname') teamname: string,
  ) {
    return this.teamsService.findTeamFromName(teamname);
  }

  @Get('teamid/:teamid')
  @ApiOperation({
    summary: '팀아이디로 팀 조회',
    description: '팀아이디로 팀을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  findTeamFromId(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
  ) {
    return this.teamsService.findTeamFromId(teamid);
  }

  @Patch(':teamid')
  @ApiOperation({
    summary: '팀 정보 수정',
    description: '팀의 정보를 수정합니다.',
  })
  @ApiBody({
    required: true,
    type: TeamsUpdate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  updateTeam(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Body() body,
    @UserInfo() userinfo: Users,
  ) {
    const { teamname } = body;
    return this.teamsService.updateTeam(teamid, teamname, userinfo);
  }

  @Delete(':teamid')
  @ApiOperation({ summary: '팀 삭제', description: '팀을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  removeTeam(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @UserInfo() userinfo: Users,
  ) {
    return this.teamsService.removeTeam(teamid, userinfo);
  }

  @Post(':teamid/teamMember')
  @ApiOperation({
    summary: '팀에 유저 초대',
    description: '팀에 유저 초대합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  createTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Query('email') email: string,
    @UserInfo() userinfo: Users,
  ) {
    return this.teamsService.createTeamMembers(teamid, email, userinfo);
  }

  @Get(':teamid/teamMembers')
  @ApiOperation({
    summary: '팀에 가입된 전체 유저 조회',
    description: '팀에 가입된 전체 유저를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  getWholeTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
  ) {
    return this.teamsService.getWholeTeamMembers(teamid);
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
    @Query('userid') userid: number,
    @Body() body,
    @UserInfo() userinfo: Users,
  ) {
    const { state } = body;
    return this.teamsService.updateTeamMembers(teamid, userid, state, userinfo);
  }

  @Delete(':teamid/users')
  @ApiOperation({
    summary: '팀 탈퇴',
    description: '유저가 팀에서 탈퇴합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: TeamMembers })
  deleteTeamMembers(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @UserInfo('userinfo') userinfo: Users,
  ) {
    return this.teamsService.deleteTeamMembers(teamid, userinfo);
  }
}
