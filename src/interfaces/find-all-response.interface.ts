import { Meta } from './meta.interface';

export interface FindAllResponse<E> {
  data: E[];
  meta: Meta;
}
