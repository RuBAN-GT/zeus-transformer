import { EntityFieldsMap, EntityManager } from '../entity-manager';
import { ComplexTarget } from '../../defs';

import { Query, Selector, TreeNode, Tree, NodeValue } from './query-builder.defs';
import { isTarget } from '../../utils';

export class QueryBuilder {
  constructor(protected readonly entityManager: EntityManager = new EntityManager()) {}

  public build(input: Query, context?: any): Selector {
    return Object.keys(input).reduce((acc: Selector, key: string) => {
      acc[key] = this.buildSelector(input[key], context);
      return acc;
    }, {});
  }

  protected buildSelector(input: NodeValue<true | ComplexTarget>, context?: any): NodeValue<true> {
    if (input === true) {
      return true;
    }
    if (isTarget(input)) {
      const tree = this.buildSelectorByTarget(input as ComplexTarget, context);
      return this.buildSelector(tree, context);
    }
    if (Array.isArray(input)) {
      return [input[0], this.buildSelectorByNode(input[1])];
    }

    return this.buildSelectorByNode(input as Tree<true | ComplexTarget>);
  }

  protected buildSelectorByNode(input: TreeNode<true | ComplexTarget>): Tree<true> {
    return Object.keys(input).reduce((acc: Tree<true>, field: string) => {
      acc[field] = input[field] !== true ? this.buildSelector(input[field]) : true;
      return acc;
    }, {});
  }

  protected buildSelectorByTarget(target: ComplexTarget, context?: any): TreeNode<true | ComplexTarget> {
    const metadata = this.entityManager.findEntity(target);
    if (!metadata) {
      throw new Error(`Unknown entity ${target.constructor.name}`);
    }

    const args = metadata.getArgs(context);
    const query = this.buildQueryByFields(metadata.getFields());

    return args ? [args, query] : query;
  }

  protected buildQueryByFields(fields: EntityFieldsMap): Tree<true | ComplexTarget> {
    return Object.keys(fields).reduce((acc: Tree<true | ComplexTarget>, field: string) => {
      const { type: fieldType } = fields[field];
      acc[field] = this.entityManager.hasEntity(fieldType) ? fieldType : true;
      return acc;
    }, {});
  }
}
