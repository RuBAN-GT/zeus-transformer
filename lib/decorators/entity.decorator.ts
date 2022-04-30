import { ComplexTarget } from '../defs';

import { EntityOptions } from '../core/entity-manager';
import { GlobalManager } from '../core/global-manager';

export function Entity(options: EntityOptions = {}): ClassDecorator {
  return <U>(target: ComplexTarget<U>): void => {
    GlobalManager.getEntityManager().defineEntity(target, options);
  };
}
