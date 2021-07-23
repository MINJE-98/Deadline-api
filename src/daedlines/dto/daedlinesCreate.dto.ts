import { ApiProperty } from '@nestjs/swagger';

export class DeadlinesCreate {
  @ApiProperty({
    example: '1',
    description: '아이템 아이디',
  })
  itemid: number | null;
  @ApiProperty({
    example: '1',
    description: '테그 아이디',
  })
  tagid: number | null;
  @ApiProperty({
    example: '2021-10-01:15:31:32',
    description: '유통기한 일자',
  })
  expiredAt: Date;
}
