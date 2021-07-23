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
import { TokenAuthError } from 'src/common/dto';
import { Items } from 'src/entities';
import { ItemsCreate } from './dto/itemsCreate.dto';
import { ItemsDelete } from './dto/itemsDelete.dto';
import { ItemsUpdate } from './dto/itemsUpdate.dto';
import { ItemsService } from './items.service';
@UseGuards(TokenCheck)
@ApiTags('Items')
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
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post(':itemname')
  @ApiOperation({
    summary: '아이템 생성',
    description: '새로운 아이템을 생성합니다.',
  })
  @ApiBody({
    required: true,
    type: ItemsCreate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  createItems(
    @Headers('accesstoken') AccessToken,
    @Body() body,
    @UserInfo('id') id: number,
  ) {
    return this.itemsService.createItems(body, id);
  }

  @Get('')
  @ApiOperation({
    summary: '아이템 아이템 조회',
    description: '아이템 아이템 조회합니다.',
  })
  @ApiQuery({
    required: false,
    name: 'itemname',
  })
  @ApiQuery({
    required: false,
    name: 'barcode',
  })
  @ApiQuery({
    required: false,
    name: 'itemid',
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  findItems(
    @Headers('accesstoken') AccessToken,
    @Query('itemname') itemname: string,
    @Query('barcode') barcode: string,
    @Query('itemid') itemid: number,
  ) {
    return this.itemsService.findItems(itemname, barcode, itemid);
  }

  @Patch(':itemid')
  @ApiOperation({
    summary: '아이템 특정 아이템 수정',
    description: '아이템 특정 아이템 수정합니다.',
  })
  @ApiBody({
    required: true,
    type: ItemsUpdate,
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  updateItems(
    @Headers('accesstoken') AccessToken,
    @UserInfo('id') id: number,
    @Body() body,
    @Param('itemid') itemid: number,
  ) {
    return this.itemsService.updateItems(id, body, itemid);
  }

  @Delete(':itemid')
  @ApiOperation({
    summary: '아이템 특정 아이템 삭제',
    description: '아이템 특정 아이템 삭제합니다.',
  })
  @ApiBody({
    required: true,
    type: ItemsDelete,
  })
  @ApiResponse({ status: 200, description: '성공', type: Items })
  removeItem(
    @Headers('accesstoken') AccessToken,
    @UserInfo('id') id: number,
    @Body('teamid') teamid: number,
    @Param('itemid') itemid: number,
  ) {
    return this.itemsService.removeItem(id, teamid, itemid);
  }
}
