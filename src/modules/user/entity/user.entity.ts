import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { EntityProps } from '@/common/types/entity-props.types';

export class User {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name?: string;

  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;

  @ApiProperty({ example: new Date() })
  created_at: Date;

  @ApiProperty({ example: new Date() })
  updated_at: Date;

  constructor(
    user: Omit<EntityProps<typeof User>, 'role'> & {
      role?: Role;
    },
  ) {
    this.id = user.id ?? crypto.randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.created_at = user.created_at ?? new Date();
    this.updated_at = user.updated_at ?? new Date();
  }
}

export class SelectableUser extends PartialType(User) {}
