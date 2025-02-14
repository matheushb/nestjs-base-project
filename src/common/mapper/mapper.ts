export interface Mapper<E, F> {
  mapToEntity(entity: E): F;
  mapFromEntity(externalEntity: F): E;
}
