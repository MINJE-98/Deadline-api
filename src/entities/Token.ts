import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({
    example: 'VStcCFThAUY57nVjf3YeUevz68A3qPkDFzqW4wo9dRkAAAF6lPR3kQ',
    description: 'accessToken',
  })
  accessToken: string;
}
