import { Injectable } from '@nestjs/common';
import { Deadline } from 'src/entities';

@Injectable()
export class DaedlineService {
  createDeadline(createDaedlineDto: Deadline) {
    return 'This action adds a new daedline';
  }

  findAllDeadline() {
    return `This action returns all daedline`;
  }

  findDeadline(id: number) {
    return `This action returns a #${id} daedline`;
  }

  updateDeadline(id: number, updateDaedlineDto: Deadline) {
    return `This action updates a #${id} daedline`;
  }

  removeDeadline(id: number) {
    return `This action removes a #${id} daedline`;
  }
}
