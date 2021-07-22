import { ApiProperty } from '@nestjs/swagger';

export class UsersUpdate {
  @ApiProperty({
    example: '조민제',
    description: '변경할 이름을 입력',
    required: false,
  })
  name: string;
  @ApiProperty({
    example:
      'http://k.kakaocdn.net/dn/j0pwB/btqV2J9RykT/mmxQS5VBGi42ddfenlMp6K/img_110x110.jpg',
    description: '변경할 프로필 사진을 입력',
    required: false,
  })
  profileUrl: string;
}
