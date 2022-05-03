import { getEntityManager } from '../../globals';
import { QueryBuilder } from './query-builder';

import {
  Primitive,
  Data,
  Collection,
  PrimitiveWithInput,
  PrimitiveWithFuncInput,
  PrimitiveWithContextInput,
} from '../../spec/helpers/entities';

describe('QueryBuilder', () => {
  const queryBuilder = new QueryBuilder(getEntityManager());

  describe('#build', () => {
    describe('static queries', () => {
      it('builds a query from primitive', () => {
        const query = queryBuilder.build({ response: Primitive });
        expect(query).toMatchObject({ response: { id: true, name: true } });
      });

      it('builds combined sub-query', () => {
        const query = queryBuilder.build({ response: Primitive, total: true });
        expect(query).toMatchObject({ response: { id: true, name: true }, total: true });
      });

      it('builds parent fields entities', () => {
        const query = queryBuilder.build({ response: Data });
        expect(query).toMatchObject({ response: { data: { id: true, name: true } } });
      });

      it('builds collection of fields entities using `type` helper', () => {
        const query = queryBuilder.build({ response: Collection });
        expect(query).toMatchObject({ response: { collection: { id: true, name: true } } });
      });
    });

    describe('queries with variables', () => {
      it('builds a query with variable', () => {
        const query = queryBuilder.build({ response: PrimitiveWithInput });
        expect(query).toMatchObject({ response: [{ take: 50 }, { id: true, name: true }] });
      });

      it('builds a query with function args', () => {
        const query = queryBuilder.build({ response: PrimitiveWithFuncInput });
        expect(query).toMatchObject({ response: [{ take: 50 }, { id: true, name: true }] });
      });

      it('builds a query with args and external context', () => {
        const context = { take: 50 };
        const query = queryBuilder.build({ response: PrimitiveWithContextInput }, context);
        expect(query).toMatchObject({ response: [{ take: context.take }, { id: true, name: true }] });
      });

      it('builds a query with predefined args', () => {
        const input = { input: 'query' };
        const query = queryBuilder.build({ response: [input, Primitive] });
        expect(query).toMatchObject({ response: [input, { id: true, name: true }] });
      });
    });
  });
});
