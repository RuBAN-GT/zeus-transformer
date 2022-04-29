export interface ClassConstructor<T> {
  new (...args: any[]): T;
}

export type ComplexTarget<T = any> = ClassConstructor<T> | Function;

export type DeepTarget<T> =
  | ComplexTarget<T>
  | Record<string, ComplexTarget<T> | Record<string, boolean> | Record<string, any> | boolean>;
