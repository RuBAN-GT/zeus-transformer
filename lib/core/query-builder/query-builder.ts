import { EntityFieldsMap, EntityManager } from '../entity-manager';
import { ComplexTarget } from '../../defs';

import { Query, Selector, TreeNode, Tree, NodeValue, QueryValue, QueryArgOption } from './query-builder.defs';
import { isTarget } from '../../utils';

export class QueryBuilder {
  constructor(protected readonly entityManager: EntityManager = new EntityManager()) {}

  // @TODO Think about types with generics
  public build<Q>(input: Q, context?: any): Selector<Q> {
    return this.buildSelector(input as any, context) as Selector<Q>;
  }

  protected buildSelector(input: NodeValue<QueryValue, QueryArgOption> | Query, context?: any): NodeValue<true> {
    if (input === true) {
      return true;
    }
    if (isTarget(input)) {
      const tree = this.buildSelectorByTarget(input as ComplexTarget, context);
      return this.buildSelector(tree, context);
    }
    if (Array.isArray(input)) {
      const subQuery = this.buildSelector(input[1]);
      if (Array.isArray(subQuery) || subQuery === true) {
        throw new Error(`Wrong arg-query construction. It can't be input or primitive.`);
      }
      return [input[0], subQuery];
    }

    return this.buildSelectorByNode(input as Tree<true | ComplexTarget>, context);
  }

  protected buildSelectorByNode(input: TreeNode<true | ComplexTarget>, context?: any): Tree<true> {
    return Object.keys(input).reduce((acc: Tree<true>, field: string) => {
      acc[field] = input[field] !== true ? this.buildSelector(input[field], context) : true;
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
