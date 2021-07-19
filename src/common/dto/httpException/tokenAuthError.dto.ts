import { ApiProperty } from '@nestjs/swagger';

export class TokenAuthError {
  @ApiProperty({
    example: '404',
    description: '에러 코드',
  })
  status: string;
  @ApiProperty({
    example: '유효하지 않는 토큰입니다.',
    description: '에러 메세지',
  })
  error: string;
}
