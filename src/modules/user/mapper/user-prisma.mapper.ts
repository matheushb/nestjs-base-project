import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { SelectableUser, User } from '../entity/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserPrismaMapper
  implements UserMapper<PrismaUser, Partial<PrismaUser>>
{
  mapToEntity(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  mapFromEntity(externalEntity: PrismaUser): User {
    return {
      id: externalEntity.id,
      name: externalEntity.name,
      email: externalEntity.email,
      role: externalEntity.role,
      password: externalEntity.password,
      created_at: externalEntity.created_at,
      updated_at: externalEntity.updated_at,
    };
  }

  mapToSelectableEntity(user: Partial<PrismaUser>): SelectableUser {
    return {
      ...(user.id && { id: user.id }),
      ...(user.name && { name: user.name }),
      ...(user.email && { email: user.email }),
      ...(user.role && { role: user.role }),
      ...(user.password && { password: user.password }),
      ...(user.created_at && { created_at: user.created_at }),
      ...(user.updated_at && { updated_at: user.updated_at }),
    };
  }
}
