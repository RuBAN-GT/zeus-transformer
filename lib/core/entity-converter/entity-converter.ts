import { ClassConstructor, ComplexTarget } from '../../defs';
import { EntityManager } from '../entity-manager';

import { NodeValue, Query, QueryArgOption, QueryValue } from '../query-builder/query-builder.defs';

export class EntityConverter {
  constructor(protected readonly entityManager: EntityManager = new EntityManager()) {}

  // @TODO Add type helpers
  public convert(query: Query, data: Record<string, any>): any {
    return this.convertNode(query, data);
  }

  protected convertNode(queryNode: NodeValue<QueryValue, QueryArgOption> | Query, dataNode: Record<string, any>): any {
    if (Array.isArray(queryNode)) {
      return this.convertNode(queryNode[1], dataNode);
    }
    if (this.entityManager.hasEntity(queryNode as ComplexTarget)) {
      return this.convertEntity(queryNode as ClassConstructor<any>, dataNode);
    }
    if (typeof dataNode === 'object') {
      return this.convertTree(queryNode, dataNode);
    }

    return dataNode;
  }

  protected convertEntity(target: ClassConstructor<any>, data: Record<string, any>): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.generateEntity(target, item));
    }
    return this.generateEntity(target, data);
  }

  protected convertTree(query: NodeValue<QueryValue, QueryArgOption> | Query, data: Record<string, any>): any {
    return Object.keys(query).reduce((acc, key) => {
      acc[key] = this.convertNode(query[key], data[key]);
      return acc;
    }, {});
  }

  protected generateEntity(target: ClassConstructor<any>, data: Record<string, any>): any {
    const metadata = this.entityManager.findEntity(target);
    if (!metadata) {
      throw new Error(`Unknown entity ${target.constructor.name}`);
    }

    const inst = new target();
    const fields = metadata.getFields();
    Object.keys(fields).forEach((field) => {
      const { type: fieldType } = fields[field];
      inst[field] = this.entityManager.hasEntity(fieldType) ? this.convertNode(fieldType, data[field]) : data[field];
    });

    return inst;
  }
}
