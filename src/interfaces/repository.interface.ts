import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { FindAllResponse } from './find-all-response.interface';
import { ObjectValues } from '@/common/types/object-keys.types';

export const DELETED = {
  YES: 'yes',
  NO: 'no',
  BOTH: 'both',
} as const;

export type Deleted = ObjectValues<typeof DELETED>;

export type RepositoryOptions = {
  deleted?: Deleted;
};

export interface Repository<E, P> {
  create(entity: E, opts?: RepositoryOptions): Promise<E>;
  findOne(id: string, opts?: RepositoryOptions): Promise<E>;
  findAll(
    params: P & PaginationParams,
    opts?: RepositoryOptions,
  ): Promise<FindAllResponse<Partial<E>>>;
  update(entity: E, opts?: RepositoryOptions): Promise<E>;
  delete(id: string, opts?: RepositoryOptions): Promise<E>;
}
