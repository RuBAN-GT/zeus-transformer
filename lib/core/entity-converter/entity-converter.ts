import { ClassConstructor, ComplexTarget } from '../../defs';
import { EntityManager } from '../entity-manager';

import { Query } from '../query-builder/query-builder.defs';

export class EntityConverter {
  constructor(protected readonly entityManager: EntityManager = new EntityManager()) {}

  public convert(query: Query, response: any): any {
    return Object.keys(query).reduce((acc, key) => {
      acc[key] = this.entityManager.hasEntity(query[key] as ClassConstructor<any>)
        ? this.convertResponse(query[key] as ClassConstructor<any>, response[key])
        : response[key];
      return acc;
    }, {});
  }

  protected convertResponse(target: ClassConstructor<any>, data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.generateEntity(target, item));
    }

    return this.generateEntity(target, data);
  }

  protected generateEntity(target: ClassConstructor<any>, data: any): any {
    const inst = new target();
    Object.assign(inst, data);

    return inst;
  }
}
