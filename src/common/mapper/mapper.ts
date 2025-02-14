export interface Mapper<T, E> {
  mapFromEntity(entity: E): T;
  mapToEntity(external: T): E;
}
