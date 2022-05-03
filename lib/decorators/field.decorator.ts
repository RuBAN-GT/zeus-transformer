import { ComplexTarget } from '../defs';
import { EntityFieldOptions } from '../core/entity-manager';
import { getEntityManager } from '../globals';

export function Field(options: EntityFieldOptions = {}): PropertyDecorator {
  return (target: ComplexTarget, propertyName: string | symbol): void => {
    getEntityManager().defineEntity(target).defineField(propertyName, options);
  };
}
