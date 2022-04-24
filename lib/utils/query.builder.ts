import { EntityManager } from '../core';
import { ClassConstructor } from '../defs';

export class QueryBuilder {
  constructor(protected readonly entityManager: EntityManager) {}

  public build<T>(entity: ClassConstructor<T> | Function): any {
    const metadata = this.entityManager.findEntity(entity);
    if (!metadata) {
      return {};
    }

    const fields = metadata.getFields();
    return Object.keys(fields).reduce((acc, field) => {
      const sub = this.entityManager.findEntity(fields[field]);
      acc[field] = sub ? this.build(sub.entity) : true;

      return acc;
    }, {} as Record<string | symbol, any>)
  }
}
