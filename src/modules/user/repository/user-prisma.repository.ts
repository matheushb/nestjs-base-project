import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import {
  paginateMeta,
  paginationParamsToPrismaParams,
} from '@/common/pagination/paginate-params';
import { UserRepositoryInterface } from '@/modules/user/repository/user.repository.interface';
import { User } from '../entity/user.entity';
import { UserFilterParams } from '../dtos/find-all-user.dto';
import { UserSelect } from '../enums/user-select.enum';
import { UserPrismaMapper } from '../mapper/user-prisma.mapper';

const USER_SELECT_FIELDS: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userMapper: UserPrismaMapper,
  ) {}

  async create(user: User) {
    const createdUser = await this.prismaService.user.create({
      data: this.userMapper.mapFromEntity(user),
      select: USER_SELECT_FIELDS,
    });

    return this.userMapper.mapToEntity(createdUser);
  }

  async findAll(params: UserFilterParams) {
    const pagination = paginationParamsToPrismaParams(params);
    const where = this.getWhereClause(params);
    const select = params.select
      ? this.getSelectFields(params)
      : USER_SELECT_FIELDS;

    const [users, meta] = await Promise.all([
      this.prismaService.user.findMany({
        ...pagination,
        select,
        where,
      }),
      paginateMeta(await this.prismaService.user.count({ where }), pagination),
    ]);

    return {
      data: users.map(this.userMapper.mapToSelectableEntity),
      meta,
    };
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: USER_SELECT_FIELDS,
    });

    if (!user) return null;

    return this.userMapper.mapToEntity(user);
  }

  async update(user: User) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: this.userMapper.mapFromEntity(user),
      select: USER_SELECT_FIELDS,
    });

    return this.userMapper.mapToEntity(updatedUser);
  }

  async delete(id: string) {
    const user = await this.prismaService.user.delete({
      where: { id },
      select: USER_SELECT_FIELDS,
    });

    if (!user) return null;

    return this.userMapper.mapToEntity(user);
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { ...USER_SELECT_FIELDS, password: true },
    });

    if (!user) return null;

    return this.userMapper.mapToEntity(user);
  }

  private getSelectFields(params: UserFilterParams): Prisma.UserSelect {
    return params.select.reduce((acc: Prisma.UserSelect, field: UserSelect) => {
      acc[field] = true;
      return acc;
    }, {});
  }

  private getWhereClause(params: UserFilterParams): Prisma.UserWhereInput {
    return {
      ...(params.email && {
        email: { contains: params.email, mode: 'insensitive' },
      }),
      ...(params.nome && {
        name: { contains: params.nome, mode: 'insensitive' },
      }),
    };
  }
}
