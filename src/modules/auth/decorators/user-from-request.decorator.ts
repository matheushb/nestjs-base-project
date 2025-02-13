import { Role } from '@/modules/user/entity/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type RequestUser = {
  email: string;
  id: string;
  role: Role;
};

export const UserFromRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
