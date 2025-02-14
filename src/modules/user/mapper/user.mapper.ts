import { Mapper } from '@/common/mapper/mapper';
import { SelectableUser, User } from '../entity/user.entity';

export const USER_MAPPER = 'USER_MAPPER';

export interface UserMapper<E, S> extends Mapper<E, User> {
  mapToSelectableEntity(selectable: S): SelectableUser;
}
