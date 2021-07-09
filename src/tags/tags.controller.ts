import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tags } from 'src/entities';
import { TagsService } from './tags.service';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: '테그 생성', description: '테그을 생성합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  createTag(@Body() createTagDto: Tags) {
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: '테그 조회', description: '테그를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  findAllTags() {
    return this.tagsService.findAllTags();
  }

  @Get(':tagId')
  @ApiOperation({
    summary: '특정 테그 조회',
    description: '특정 테그을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  findTag(@Param('tagId') tagId: string) {
    return this.tagsService.findTag(+tagId);
  }

  @Patch(':tagId')
  @ApiOperation({
    summary: '특정 테그 수정',
    description: '특정 테그를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  updateTag(@Param('tagId') tagId: string, @Body() updateTagDto: Tags) {
    return this.tagsService.updateTag(+tagId, updateTagDto);
  }

  @Delete(':tagId')
  @ApiOperation({
    summary: '특정 테그 삭제',
    description: '특정 테그를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Tags })
  removeTag(@Param('tagId') id: string) {
    return this.tagsService.removeTag(+id);
  }
}
