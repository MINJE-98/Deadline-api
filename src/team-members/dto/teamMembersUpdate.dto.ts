import { ApiProperty } from '@nestjs/swagger';

export class TeamMembersUpdate {
  @ApiProperty({
    example: '0',
    description: '팀 상태',
  })
  state: number;
}
