import { ApiProperty } from '@nestjs/swagger';

export class TeamsUpdate {
  @ApiProperty({
    example: '가톨릭 요양병원',
    description: '팀 이름',
  })
  teamname: string;
}
