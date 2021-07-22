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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenCheck } from 'src/auth/token.check.guard';
import { UserInfo } from 'src/common/decorator';
import { TagUpdate, TokenAuthError } from 'src/common/dto';
import { Tags } from 'src/entities';
import { TagsService } from './tags.service';

@UseGuards(TokenCheck)
@ApiTags('Tags')
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
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('/:teamid/tags/:tagname')
  @ApiOperation({ summary: '테그 생성', description: '테그를 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  createTags(
    @Headers('accessToken') AccessToken,
    @UserInfo('id') id,
    @Param('teamid') teamid: number,
    @Param('tagname') tagname: string,
  ) {
    return this.tagsService.createTags(id, teamid, tagname);
  }

  @Get('/:teamid/tags')
  @ApiOperation({
    summary: '테그를 조회',
    description: '테그를 조회합니다.',
  })
  @ApiQuery({
    required: false,
    name: 'tagid',
  })
  @ApiQuery({
    required: false,
    name: 'tagname',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  findTags(
    @Headers('accessToken') AccessToken,
    @UserInfo('id') id,
    @Param('teamid') teamid: number,
    @Query('tagid') tagid: number,
    @Query('tagname') tagname: string,
  ) {
    return this.tagsService.findTags(id, teamid, tagid, tagname);
  }

  @Patch('/:teamid/tags/:tagid')
  @ApiOperation({
    summary: '테그 수정',
    description: '테그를 수정합니다.',
  })
  @ApiBody({
    type: TagUpdate,
    description: '변경할 테그명',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  updateTag(
    @Headers('accessToken') AccessToken,
    @UserInfo('id') id,
    @Param('teamid') teamid: number,
    @Param('tagid') tagid: number,
    @Body('name') tagname,
  ) {
    return this.tagsService.updateTag(id, teamid, tagid, tagname);
  }

  @Delete('/:teamid/tags/:tagid')
  @ApiOperation({
    summary: '테그 삭제',
    description: '테그를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  removeTags(
    @Headers('accessToken') AccessToken,
    @UserInfo('id') id,
    @Param('teamid') teamid: number,
    @Param('tagid') tagid: number,
  ) {
    return this.tagsService.removeTags(id, teamid, tagid);
  }
}
