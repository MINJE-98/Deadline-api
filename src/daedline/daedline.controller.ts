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
import { Deadline } from 'src/entities';
import { DaedlineService } from './daedline.service';

@ApiTags('Deadline')
@Controller('daedline')
export class DaedlineController {
  constructor(private readonly daedlineService: DaedlineService) {}

  @Post()
  @ApiOperation({
    summary: '유통기한 등록',
    description: '유통기한 등록합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadline })
  createDeadline(@Body() createDaedlineDto: Deadline) {
    return this.daedlineService.createDeadline(createDaedlineDto);
  }

  @Get()
  @ApiOperation({
    summary: '등록한 전체 유통기한 조회',
    description: '등록한 전체 유통기한 가져오기',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadline })
  findAllDeadline() {
    return this.daedlineService.findAllDeadline();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 유통기한 조회',
    description: '등록한 전체 유통기한 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadline })
  findDeadline(@Param('id') id: string) {
    return this.daedlineService.findDeadline(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 유통기한 수정',
    description: '등록한 전체 유통기한 수정합니다',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadline })
  updateDeadline(@Param('id') id: string, @Body() updateDaedlineDto: Deadline) {
    return this.daedlineService.updateDeadline(+id, updateDaedlineDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 유통기한 삭제',
    description: '등록한 전체 유통기한 삭제합니다',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadline })
  removeDeadline(@Param('id') id: string) {
    return this.daedlineService.removeDeadline(+id);
  }
}
