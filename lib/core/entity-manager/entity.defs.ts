import { ComplexTarget } from '../../defs';

export type EntityOptionsArgs = Record<string, any>;
export interface EntityOptions {
  args?: EntityOptionsArgs;
}

export interface EntityFieldData {
  type: ComplexTarget;
}
export type EntityFieldOptions = Partial<EntityFieldData>;
export type EntityFieldsMap = Record<string, EntityFieldData>;
