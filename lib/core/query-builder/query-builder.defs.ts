import { ComplexTarget } from '../../defs';

export type QueryArgs = Record<string, any>;

export interface Tree<V> {
  [key: string]: V | [QueryArgs, Tree<V>] | Tree<V>
}
export type TreeNode<V> = Tree<V> | [QueryArgs, Tree<V>];
export type NodeValue<V> = V | TreeNode<V>;
export type RootTree<V> = Record<string, NodeValue<V>>;

export type Selector = RootTree<true>;
export type Query = RootTree<true | ComplexTarget>;
