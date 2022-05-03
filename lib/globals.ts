import { QueryBuilder } from './core/query-builder';
import { EntityConverter } from './core/entity-converter';
import { EntityManager } from './core/entity-manager';

let entityManager;

export function getEntityManager(): EntityManager {
  if (!entityManager) {
    useEntityManager(new EntityManager());
  }
  return entityManager;
}

export function useEntityManager(sample: EntityManager): void {
  entityManager = sample;
}

export const queryBuilder = new QueryBuilder(getEntityManager());
export const entityConverter = new EntityConverter(getEntityManager());
