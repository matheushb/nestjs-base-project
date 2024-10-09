import { User } from '@prisma/client';
import { Repository } from './repository';

export interface IUserRepository extends Repository<Omit<User, 'password'>> {
  findByEmail(email: string);
}
