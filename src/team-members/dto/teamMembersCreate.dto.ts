import { ApiProperty } from '@nestjs/swagger';

export class TeamMembersCreate {
  @ApiProperty({
    example: 'jmj012100@gmail.com',
    description: '이메일',
  })
  email: string;
}
