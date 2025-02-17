export interface Mapper<E, T> {
  mapFromEntity(entity: E): T;
  mapToEntity(external: T): E;
}
