import { ApiProperty } from '@nestjs/swagger';

export class TagUpdate {
  @ApiProperty({
    example: '온장고',
    description: '테그 명',
  })
  name: string;
}
