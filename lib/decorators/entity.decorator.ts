import { ComplexTarget } from '../defs';
import { getEntityManager } from '../globals';
import { EntityOptions } from '../core/entity-manager';

export function Entity(options: EntityOptions = {}): ClassDecorator {
  return <U>(target: ComplexTarget<U>): void => {
    getEntityManager().defineEntity(target, options);
  };
}
