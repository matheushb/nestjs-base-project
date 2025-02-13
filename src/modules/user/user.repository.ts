import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaPaginationParams } from '../auth/decorators/pagination.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { IUserRepository } from '@/common/interfaces/user.repository.interface';
import { paginateMeta } from '@/common/pagination/paginate-params';

const USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
};

export const USER_PRISMA_REPOSITORY = 'user_repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
      select: USER_SELECT_FIELDS,
    });
  }

  async findAll(pagination: PrismaPaginationParams) {
    const [users, meta] = await Promise.all([
      this.prismaService.user.findMany({
        ...pagination,
        select: USER_SELECT_FIELDS,
      }),
      paginateMeta(await this.prismaService.user.count(), pagination),
    ]);

    return {
      data: users,
      meta,
    };
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: USER_SELECT_FIELDS,
    });
  }

  delete(id: string) {
    return this.prismaService.user.delete({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: { ...USER_SELECT_FIELDS, password: true },
    });
  }
}
