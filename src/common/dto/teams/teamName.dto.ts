import { ApiProperty } from '@nestjs/swagger';

export class TeamName {
  @ApiProperty({
    example: '팀명',
    description: '팀명',
  })
  teamname: string;
}
