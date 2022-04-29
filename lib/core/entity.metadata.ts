import 'reflect-metadata';

import { ClassConstructor } from '../defs';

export interface FieldMetadata<T = any> {
  type: ClassConstructor<T>;
}

export interface FieldOptions<T = any> {
  type?: FieldMetadata<T>['type'];
}

export interface EntityOptions {
  args?: Record<string, any>;
}

export type FieldMetadataMap<T = any> = Record<string | symbol, FieldMetadata<T>>;

export class EntityMetadata {
  protected readonly args?: Record<string, any>;
  protected readonly fieldsMap: Map<string | symbol, FieldMetadata>;

  constructor(public readonly entity: Function, options: EntityOptions = {}) {
    this.fieldsMap = new Map();
    this.args = options.args;
  }

  public registerField<T>(property: string | symbol, options: FieldOptions<T>): void {
    this.fieldsMap.set(property, {
      ...options,
      type: options.type || Reflect.getMetadata('design:type', this.entity, property),
    });
  }

  public findField(property: string | symbol): any {
    return this.fieldsMap.get(property);
  }

  public hasField(property: string | symbol): boolean {
    return this.fieldsMap.has(property);
  }

  public getFieldsList(): Array<string | symbol> {
    return [...this.fieldsMap.keys()];
  }

  public getFields(): FieldMetadataMap {
    return Object.fromEntries(this.fieldsMap);
  }

  public getArgs(): Record<string, any> {
    return this.args;
  }
}
