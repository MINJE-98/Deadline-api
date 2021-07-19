import { ApiProperty } from '@nestjs/swagger';

export class TeamId {
  @ApiProperty({
    example: '1',
    description: '팀아이디',
  })
  teamid: string;
}
