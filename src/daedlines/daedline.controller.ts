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
import { Deadlines } from 'src/entities';
import { DaedlineService } from './daedline.service';

@ApiTags('Deadlines')
@Controller('daedlines')
export class DaedlineController {
  constructor(private readonly daedlineService: DaedlineService) {}

  @Post()
  @ApiOperation({
    summary: '유통기한 등록',
    description: '유통기한 등록합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  createDeadline(@Body() createDaedlineDto: Deadlines) {
    return this.daedlineService.createDeadline(createDaedlineDto);
  }

  @Get()
  @ApiOperation({
    summary: '등록한 전체 유통기한 조회',
    description: '등록한 전체 유통기한 가져오기',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  findAllDeadline() {
    return this.daedlineService.findAllDeadline();
  }

  @Get(':DeadlineId')
  @ApiOperation({
    summary: '특정 유통기한 조회',
    description: '등록한 전체 유통기한 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  findDeadline(@Param('DeadlineId') id: string) {
    return this.daedlineService.findDeadline(+id);
  }

  @Patch(':DeadlineId')
  @ApiOperation({
    summary: '특정 유통기한 수정',
    description: '등록한 전체 유통기한 수정합니다',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  updateDeadline(
    @Param('DeadlineId') id: string,
    @Body() updateDaedlineDto: Deadlines,
  ) {
    return this.daedlineService.updateDeadline(+id, updateDaedlineDto);
  }

  @Delete(':DeadlineId')
  @ApiOperation({
    summary: '특정 유통기한 삭제',
    description: '등록한 전체 유통기한 삭제합니다',
  })
  @ApiResponse({ status: 200, description: '성공', type: Deadlines })
  removeDeadline(@Param('DeadlineId') id: string) {
    return this.daedlineService.removeDeadline(+id);
  }
}
