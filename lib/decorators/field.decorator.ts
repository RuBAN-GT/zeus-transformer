import { ComplexTarget } from '../defs';
import { FieldOptions, GlobalsManager } from '../core';

export function Field<T>(metadata: FieldOptions<T> = {}): PropertyDecorator {
  return <U>(target: ComplexTarget<U>, propertyName: string): void => {
    GlobalsManager.getEntityManager().registerEntity(target).registerField(propertyName, metadata);
  };
}
