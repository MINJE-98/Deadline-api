import { ApiProperty } from '@nestjs/swagger';

export class TeamState {
  @ApiProperty({
    example: '0',
    description: '팀 상태',
  })
  state: string;
}
