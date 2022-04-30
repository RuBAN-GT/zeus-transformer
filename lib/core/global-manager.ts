import { EntityManager } from './entity-manager';

export namespace GlobalManager {
  export let entityManager: EntityManager;

  export function getEntityManager(): EntityManager {
    if (!entityManager) {
      useEntityManager(new EntityManager());
    }
    return entityManager;
  }

  export function useEntityManager(sample: EntityManager): void {
    entityManager = sample;
  }
}
