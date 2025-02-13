import {
  Paginate,
  PrismaPaginationParams,
} from '@/modules/auth/decorators/pagination.decorator';

export interface Repository<E> {
  create(entity: Partial<E>): Promise<E>;
  findOne(id: string): Promise<E>;
  findAll(pagination: PrismaPaginationParams): Promise<Paginate<E>>;
  update(id: string, entity: Partial<E>): Promise<E>;
  delete(id: string): Promise<E>;
}
