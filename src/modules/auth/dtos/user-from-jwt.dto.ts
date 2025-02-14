import { Role } from '@/modules/user/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserFromJwt {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  id: string;

  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;
}

export class AuthMeResponse {
  @ApiProperty({ type: UserFromJwt })
  user: UserFromJwt;
}
