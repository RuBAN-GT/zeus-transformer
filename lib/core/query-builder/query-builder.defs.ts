import { ComplexTarget, ClassConstructor } from '../../defs';

export type QueryArgs = Record<string, any>;

export interface Tree<V> {
  [key: string]: V | [QueryArgs, Tree<V>] | Tree<V>
}
export type TreeNode<V, A = Tree<V>> = Tree<V> | [QueryArgs, A];
export type NodeValue<V, A = Tree<V>> = V | TreeNode<V, A>;
export type RootTree<V, A = Tree<V>> = Record<string, NodeValue<V, A>>;

export type QueryValue = true | ComplexTarget;
export type QueryArgOption = Tree<QueryValue> | ComplexTarget;
export type Query = RootTree<QueryValue, QueryArgOption> | ComplexTarget;

export type Selector<T> = T extends new (...args: any) => any
  ? {
      [K in keyof InstanceType<T>]: InstanceType<T>[K] extends new (...args: any) => any
        ? Selector<InstanceType<T>[K]>
        : true;
    }
  : {
      [K in keyof T]: T[K] extends object ? Selector<T[K]> : true;
    };
