import { Repository } from '../../../interfaces/repository.interface';
import { User } from '../entity/user.entity';
import { UserFilterParams } from '../dtos/find-all-user.dto';

export interface UserRepositoryInterface
  extends Repository<User, UserFilterParams> {
  findByEmail(email: string): Promise<User | null>;
}
