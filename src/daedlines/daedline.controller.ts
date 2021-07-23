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
import { UserInfo } from 'src/common/decorator';
import { TokenAuthError } from 'src/common/dto';
import { Deadlines } from 'src/entities';
import { DaedlineService } from './daedline.service';
import { DeadlinesCreate } from './dto/daedlinesCreate.dto';
import { DeadlinesUpdate } from './dto/deadlinesUpdate.dto';

@UseGuards(TokenCheck)
@ApiTags('Deadlines')
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
export class DaedlineController {
  constructor(private readonly daedlineService: DaedlineService) {}

  @Post(':teamid/deadlines')
  @ApiOperation({
    summary: '유통기한 등록',
    description: '유통기한 등록합니다.',
  })
  @ApiBody({
    required: true,
    type: DeadlinesCreate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  createDeadline(
    @Headers('accesstoken') AccessToken,
    @Body() body,
    @Param('teamid') teamid: number,
    @UserInfo('id') id: number,
  ) {
    return this.daedlineService.createDeadline(body, teamid, id);
  }

  @Get(':teamid/deadlines')
  @ApiOperation({
    summary: '등록한 전체 유통기한 조회',
    description: '등록한 전체 유통기한 가져오기',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  findDeadline(
    @Headers('accesstoken') AccessToken,
    @Param('teamid') teamid: number,
    @UserInfo('id') id: number,
  ) {
    return this.daedlineService.findDeadline(teamid, id);
  }

  @Patch(':teamid/deadlines/:deadlineid')
  @ApiOperation({
    summary: '유통기한 수정',
    description: '유통기한 수정합니다',
  })
  @ApiBody({
    required: true,
    type: DeadlinesUpdate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  updateDeadline(
    @Headers('accesstoken') AccessToken,
    @Body() body,
    @Param('teamid') teamid: number,
    @Param('deadlineid') deadlineid: number,
    @UserInfo('id') id: number,
  ) {
    return this.daedlineService.updateDeadline(body, teamid, id, deadlineid);
  }

  @Delete(':teamid/deadlines/:deadlineid')
  @ApiOperation({
    summary: '유통기한 삭제',
    description: '유통기한 삭제합니다',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  removeDeadline(
    @Headers('accesstoken') AccessToken,
    @Param('teamid') teamid: number,
    @Param('deadlineid') deadlineid: number,
    @UserInfo('id') id: number,
  ) {
    return this.daedlineService.removeDeadline(teamid, deadlineid, id);
  }
}
