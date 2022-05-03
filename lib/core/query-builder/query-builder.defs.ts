import { ComplexTarget } from '../../defs';

export type QueryArgs = Record<string, any>;

export interface Tree<V> {
  [key: string]: V | [QueryArgs, Tree<V>] | Tree<V>
}
export type TreeNode<V, A = Tree<V>> = Tree<V> | [QueryArgs, A];
export type NodeValue<V, A = Tree<V>> = V | TreeNode<V, A>;
export type RootTree<V, A = Tree<V>> = Record<string, NodeValue<V, A>>;

export type Selector = RootTree<true>;

export type QueryValue = true | ComplexTarget;
export type QueryArgOption = Tree<QueryValue> | ComplexTarget;
export type Query = RootTree<QueryValue, QueryArgOption>;
