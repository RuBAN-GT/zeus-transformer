import { ComplexTarget } from '../defs';
import { EntityOptions, GlobalsManager } from '../core';

export function Entity(options: EntityOptions = {}): ClassDecorator {
  return <U>(target: ComplexTarget<U>): void => {
    GlobalsManager.getEntityManager().registerEntity(target, options);
  };
}
