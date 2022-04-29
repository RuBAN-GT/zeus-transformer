import { DeepTarget } from '../defs';

export const isTarget = <T>(sample: DeepTarget<T>) => sample.prototype !== undefined;
