import { EntityManager } from '../core';
import { ComplexTarget, DeepTarget } from '../defs';

import { isTarget } from './helpers';

type QueryMap = Record<string, any> | [Record<string, any>, Record<string, any>];

export class QueryBuilder {
  constructor(protected readonly entityManager: EntityManager = new EntityManager()) {}

  public build<T>(input: DeepTarget<T>): QueryMap {
    const fields = isTarget(input) ? this.getEntityFields(input as ComplexTarget<T>) : input;

    return Object.keys(fields).reduce((acc, field) => {
      if (Array.isArray(fields[field])) {
        const [args, sub] = fields[field];
        acc[field] = [args, this.build(sub)];
      } else {
        acc[field] = fields[field] !== true ? this.build(fields[field]) : true;
      }

      return acc;
    }, {});
  }

  protected getEntityFields<T>(input: ComplexTarget<T>): QueryMap {
    const metadata = this.entityManager.findEntity(input as any);
    if (!metadata) {
      return {};
    }

    const args = metadata.getArgs();
    const fields = metadata.getFields();
    const fieldsMap = Object.keys(fields).reduce((acc, field) => {
      const { type: fieldType } = fields[field];
      acc[field] = this.entityManager.hasEntity(fieldType) ? fieldType : true;
      return acc;
    }, {});

    return args ? [args, fieldsMap] : fieldsMap;
  }
}
