import { PrismaPaginationParams } from '@/modules/auth/decorators/pagination.decorator';

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
