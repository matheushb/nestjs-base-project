import {
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type PaginationParams = {
  page: number;
  perPage: number;
};

export type PrismaPaginationParams = {
  skip: number;
  take: number;
};

export type PaginationMeta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export const Pagination = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = sanitizeInput(request.query.page, 1);
    const perPage = sanitizeInput(request.query.perPage, 10, 1000);
    const { skip, take } = paginationParamsToPrismaParams({ page, perPage });

    return {
      skip,
      take,
    };
  },
);

export const HasPaginationQuery = () => {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
    }),
    ApiQuery({
      name: 'perPage',
      type: Number,
      required: false,
    }),
  );
};

function sanitizeInput(input: string, defaultValue: number, maxValue?: number) {
  if (maxValue) {
    return Math.min(Math.max(parseInt(input) || defaultValue, 1), maxValue);
  }
  return Math.max(parseInt(input) || defaultValue, 1);
}

function paginationParamsToPrismaParams(paginationParams: PaginationParams) {
  return {
    skip: (paginationParams.page - 1) * paginationParams.perPage,
    take: paginationParams.perPage,
  };
}
