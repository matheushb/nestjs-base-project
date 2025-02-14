import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';

export const NoRoles = () => SetMetadata(ROLES_KEY, []);
