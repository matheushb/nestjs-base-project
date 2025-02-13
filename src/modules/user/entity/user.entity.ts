export type ObjectValues<T> = T[keyof T];

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = ObjectValues<typeof Role>;

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
