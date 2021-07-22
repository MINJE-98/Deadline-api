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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenCheck } from 'src/auth/token.check.guard';
import { TokenAuthError } from '../common/dto';
import { UserInfo } from 'src/common/decorator';
import { TeamMembers, Teams, Users } from 'src/entities';
import { TeamsService } from './teams.service';
import { TeamsUpdate } from './dto/teamsUpdate.dto';

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

  @ApiOperation({ summary: '팀 생성', description: '팀을 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  @Post(':teamname')
  createTeam(
    @Headers('accessToken') AccessToken,
    @UserInfo('id') id: number,
    @Param('teamname') teamname: string,
  ) {
    return this.teamsService.createTeam(id, teamname);
  }

  @ApiOperation({
    summary: '팀을 조회',
    description: '팀을 조회합니다.',
  })
  @ApiQuery({
    required: false,
    name: 'teamname',
  })
  @ApiQuery({
    required: false,
    name: 'teamid',
  })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  @Get()
  findTeam(
    @Headers('accessToken') AccessToken,
    @Query('teamname') teamname: string,
    @Query('teamid') teamid: number,
  ) {
    return this.teamsService.findTeam(teamname, teamid);
  }

  @ApiOperation({
    summary: '팀 정보 수정',
    description: '팀의 정보를 수정합니다.',
  })
  @ApiBody({
    required: true,
    type: TeamsUpdate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  @Patch(':teamid')
  updateTeam(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @Body('teamname') teamname: string,
    @UserInfo('id') id: number,
  ) {
    return this.teamsService.updateTeam(teamid, teamname, id);
  }

  @ApiOperation({ summary: '팀 삭제', description: '팀을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Teams })
  @Delete(':teamid')
  removeTeam(
    @Headers('accessToken') AccessToken,
    @Param('teamid') teamid: number,
    @UserInfo('id') id: number,
  ) {
    return this.teamsService.removeTeam(teamid, id);
  }
}
