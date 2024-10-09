import { PrismaPaginationParams } from '../../modules/auth/decorators/pagination.decorator';

export type Paginate<E> = {
  data: E[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    next: boolean;
    prev: boolean;
  };
};

export interface Repository<E> {
  create(entity: Partial<E>): Promise<E>;
  findOne(id: string): Promise<E>;
  findAll(pagination: PrismaPaginationParams): Promise<Paginate<E>>;
  update(id: string, entity: Partial<E>): Promise<E>;
  delete(id: string): Promise<E>;
}
