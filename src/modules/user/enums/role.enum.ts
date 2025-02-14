import { ObjectValues } from '@/common/types/object-keys.types';

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = ObjectValues<typeof Role>;
