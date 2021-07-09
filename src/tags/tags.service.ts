import { Injectable } from '@nestjs/common';
import { Tags } from 'src/entities';

@Injectable()
export class TagsService {
  createTag(createTagDto: Tags) {
    return 'createTag';
  }

  findAllTags() {
    return `findAllTags`;
  }

  findTag(id: number) {
    return `findTag`;
  }

  updateTag(id: number, updateTagDto: Tags) {
    return `updateTag`;
  }

  removeTag(id: number) {
    return `removeTag`;
  }
}
