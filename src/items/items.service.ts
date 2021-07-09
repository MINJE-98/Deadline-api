import { Injectable } from '@nestjs/common';
import { Items } from 'src/entities';

@Injectable()
export class ItemsService {
  createItem(createItemDto: Items) {
    return 'createItem';
  }

  findItems(id: number) {
    return `findItems`;
  }

  updateItem(id: number) {
    return `updateItem`;
  }

  removeItem(id: number) {
    return `removeItem`;
  }
  getMyTeamItem(teamId: number) {
    return `getMyTeamItem`;
  }
}
