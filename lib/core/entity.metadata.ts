import 'reflect-metadata';

import { ClassConstructor } from '../defs';

export class EntityMetadata {
  protected readonly fieldsMap: Map<string | symbol, any>;

  constructor(public readonly entity: Function) {
    this.fieldsMap = new Map();
  }

  public registerField<T>(property: string | symbol, basicType?: ClassConstructor<T>): void {
    const fieldType = basicType || Reflect.getMetadata('design:type', this.entity, property);
    this.fieldsMap.set(property, fieldType);
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

  public getFields(): Record<string | symbol, any> {
    return Object.fromEntries(this.fieldsMap);
  }
}
