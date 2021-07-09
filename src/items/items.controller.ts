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
import { Items } from 'src/entities';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({
    summary: '아이템 생성',
    description: '새로운 아이템을 생성합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  createItem(@Body() createItemDto: Items) {
    return this.itemsService.createItem(createItemDto);
  }

  @Get(':ItemName')
  @ApiOperation({
    summary: '아이템 특정 아이템 조회',
    description: '아이템 특정 아이템 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  findItems(@Param('ItemName') ItemName: string) {
    return this.itemsService.findItems(+ItemName);
  }

  @Patch(':Itemid')
  @ApiOperation({
    summary: '아이템 특정 아이템 수정',
    description: '아이템 특정 아이템 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  updateItem(@Param('Itemid') Itemid: string) {
    return this.itemsService.updateItem(+Itemid);
  }

  @Delete(':Itemid')
  @ApiOperation({
    summary: '아이템 특정 아이템 삭제',
    description: '아이템 특정 아이템 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  removeItem(@Param('Itemid') Itemid: string) {
    return this.itemsService.removeItem(+Itemid);
  }

  @Get('teams/:teamId')
  @ApiOperation({
    summary: '팀이 등록한 아이템 모두 보기',
    description: '팀이 등록한 아이템 모두 보여줍니다.',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  getMyTeamItem(@Param('teamId') teamId: string) {
    return this.itemsService.findItems(+teamId);
  }
}
