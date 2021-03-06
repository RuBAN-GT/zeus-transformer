import 'reflect-metadata';

import { ComplexTarget } from '../../defs';
import { EntityOptions, EntityFieldOptions, EntityFieldData, EntityFieldsMap, EntityOptionsArgs, EntityArgsData } from './entity.defs';

export class EntityMetadata {
  protected args?: EntityOptionsArgs;
  protected readonly fields: Map<string | symbol, EntityFieldData>;

  constructor(public readonly entity: ComplexTarget, options: EntityOptions = {}) {
    this.fields = new Map();
    this.defineOptions(options);
  }

  public defineOptions(options: EntityOptions = {}): void {
    this.args = options.args;
  }

  public defineField(property: string | symbol, options: EntityFieldOptions): void {
    const propType = options.type || Reflect.getMetadata('design:type', this.entity, property);
    this.fields.set(property, {
      ...options,
      type: propType,
    });
  }

  public getArgs<T>(context: T): EntityArgsData | undefined {
    if (!this.args) {
      return;
    }
    return typeof this.args === 'function' ? this.args(context) : this.args;
  }

  public getFields(): EntityFieldsMap {
    return Object.fromEntries(this.fields);
  }
}
