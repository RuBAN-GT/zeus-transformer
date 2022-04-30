import { ComplexTarget } from '../defs';

import { EntityFieldOptions } from '../core/entity-manager';
import { GlobalManager } from '../core/global-manager';

export function Field(options: EntityFieldOptions = {}): PropertyDecorator {
  return (target: ComplexTarget, propertyName: string | symbol): void => {
    GlobalManager.getEntityManager().defineEntity(target).defineField(propertyName, options);
  };
}
