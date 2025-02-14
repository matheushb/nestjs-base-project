import { ObjectValues } from '@/common/types/object-keys.types';

export const USER_SELECT = {
  ID: 'id',
  NAME: 'name',
  EMAIL: 'email',
  ROLE: 'role',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

export type UserSelect = ObjectValues<typeof USER_SELECT>;
