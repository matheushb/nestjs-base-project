import { User } from '@/modules/user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithJwt {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({
    example:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3Mzk1NDQ4NTAsImV4cCI6MTc3MTA4MDg1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3',
  })
  access_token: string;
}
