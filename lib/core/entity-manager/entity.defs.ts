import { ComplexTarget } from '../../defs';

export type EntityArgsData = Record<string, any>;
export type EntityOptionsArgs = EntityArgsData | ((...args: any[]) => EntityArgsData);
export interface EntityOptions {
  args?: EntityOptionsArgs;
}

export interface EntityFieldData {
  type: ComplexTarget;
}
export type EntityFieldOptions = Partial<EntityFieldData>;
export type EntityFieldsMap = Record<string, EntityFieldData>;
