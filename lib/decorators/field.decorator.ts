import { ClassConstructor } from 'lib/defs';
import { entityGlobalManager } from '../helpers.globals';

export interface FieldDecoratorMetadata<T> {
  type?: ClassConstructor<T>;
}

export function Field<T>({ type }: FieldDecoratorMetadata<T> = {}): PropertyDecorator {
  return <U>(target: ClassConstructor<U> | Function, propertyName: string): void => {
    entityGlobalManager.registerEntity(target).registerField(propertyName, type);
  };
}
