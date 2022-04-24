export interface ClassConstructor<T> {
  new (...args: any[]): T;
}
