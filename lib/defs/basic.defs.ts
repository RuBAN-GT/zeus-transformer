export interface ClassConstructor<T> {
  new (...args: any[]): T;
}

export type ComplexTarget<T = any> = ClassConstructor<T> | Function;
