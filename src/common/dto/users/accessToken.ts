import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    example: 'iH6kwgPnvJG8kW2JIdurxpCH-8RkML8EuA43UAo9dBEAAAF6nUG8qg',
    description: 'accessToken',
  })
  accessToken: string;
}
