export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
