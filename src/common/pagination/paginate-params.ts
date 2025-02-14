import { PaginationParams } from '../decorators/pagination/pagination.decorator';

export type PrismaPaginationParams = {
  skip: number;
  take: number;
};

export function paginationParamsToPrismaParams(
  paginationParams: PaginationParams,
) {
  return {
    skip: (paginationParams.page - 1) * paginationParams.perPage,
    take: paginationParams.perPage,
  };
}

export async function paginateMeta(
  total: number,
  pagination: PrismaPaginationParams,
) {
  const lastPage = Math.ceil(total / pagination.take);
  const next = pagination.skip + pagination.take < total;
  const prev = pagination.skip > 0;
  const currentPage = pagination.skip / pagination.take + 1;

  return {
    total,
    lastPage,
    currentPage: currentPage,
    perPage: pagination.take,
    next,
    prev,
  };
}
