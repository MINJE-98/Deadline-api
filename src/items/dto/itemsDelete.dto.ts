import { ApiProperty } from '@nestjs/swagger';

export class ItemsDelete {
  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  teamid: number;
}
