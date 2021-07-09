import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Teamembers, Teams } from 'src/entities';
import { TeamsService } from './teams.service';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: '팀 생성', description: '팀을 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  createTeam(@Body() createTeamDto: Teams) {
    return this.teamsService.createTeam(createTeamDto);
  }

  @Get(':teamId')
  @ApiOperation({ summary: '팀 조회', description: '팀을 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  findTeam(@Param('teamId') teamId: string) {
    return this.teamsService.findTeam(+teamId);
  }

  @Patch(':teamId')
  @ApiOperation({ summary: '팀 수정', description: '팀을 수정합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  updateTeam(@Param('teamId') teamId: string, @Body() updateTeamDto: Teams) {
    return this.teamsService.updateTeam(+teamId, updateTeamDto);
  }

  @Delete(':teamId')
  @ApiOperation({ summary: '팀 삭제', description: '팀을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  removeTeam(@Param('id') id: string) {
    return this.teamsService.removeTeam(+id);
  }

  @Post(':teamId/user')
  @ApiOperation({
    summary: '팀에 유저 초대',
    description: '팀에 유저 초대합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teamembers })
  createTeamMembers(@Body('email') email: string) {
    return this.teamsService.createTeamMembers(email);
  }

  @Get(':teamId/user')
  @ApiOperation({
    summary: '팀에 가입된 유저 조회',
    description: '팀에 가입된 모든 유저를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teamembers })
  getTeamMembers(@Param('teamid') param: string) {
    return this.teamsService.getTeamMembers(param);
  }

  @Patch(':teamId/user')
  @ApiOperation({
    summary: '팀에 가입한 유저 수정',
    description: '팀에 가입된 유저 정보 상태 변경합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teamembers })
  updateTeamMembersState(@Body('email') email: string) {
    return this.teamsService.updateTeamMembersState(email);
  }

  @Delete(':teamId/user')
  @ApiOperation({
    summary: '팀 탈퇴',
    description: '유저가 팀에서 탈퇴합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teamembers })
  deleteTeamMembersState(@Body('email') email: string) {
    return this.teamsService.deleteTeamMembersState(email);
  }
}
