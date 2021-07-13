import { ApiProperty } from '@nestjs/swagger';

export class SocialId {
  @ApiProperty({
    example: '1804030582',
    description: '카카오 uid',
  })
  socialId: string;

  // @ApiProperty({
  //   example: '조민제',
  //   description: '이름',
  // })
  // name: string;

  // @ApiProperty({
  //   example:
  //     'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  //   description: '프로필 사진',
  // })
  // profileUri: string;
  // @ApiProperty({
  //   example: 'jmj012100@gmail.com',
  //   description: '이메일',
  // })
  // email: string;
  // @ApiProperty({
  //   example: '2021-07-10:15:31:32',
  //   description: '생성일자',
  // })
  // createAt: Date;

  // @ApiProperty({
  //   example: '2021-07-10:15:31:32',
  //   description: '유통기한 수정일자',
  // })
  // updateAt: Date;
}
