import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    example: '9drkNW-ZCtV0zgrRu9AW6ztIwXwqxrwwAYc7AAo9cxgAAAF6qHWUNg',
    description: 'accessToken',
  })
  accessToken: string;
}
