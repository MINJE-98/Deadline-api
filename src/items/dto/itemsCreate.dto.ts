import { ApiProperty } from '@nestjs/swagger';

export class ItemsCreate {
  @ApiProperty({
    example: '1',
    description: '팀 아이디',
  })
  teamid: number;
  @ApiProperty({
    example: '아이시스',
    description: '아이템 이름',
  })
  name: string;
  @ApiProperty({
    example: 'http://~',
    description: '아이템 이미지',
  })
  imageURL: string;
  @ApiProperty({
    example: '880123123',
    description: '아이템 바코드',
  })
  barcode: string;
}
