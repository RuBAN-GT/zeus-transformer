import { GlobalManager } from '../global-manager';
import { Entity, Field } from '../../decorators';
import { QueryBuilder } from './query-builder';

class Primitive {
  @Field() public id: number | string;
  @Field() public name: string;
}

class Data {
  @Field() data: Primitive;
}

class Collection {
  @Field({ type: Primitive }) collection: Primitive[];
}

@Entity({ args: { take: 50 } })
class PrimitiveWithInput {
  @Field() public id: number | string;
  @Field() public name: string;
}

describe('QueryBuilder', () => {
  const queryBuilder = new QueryBuilder(GlobalManager.getEntityManager());

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

      // @TODO Implement me
      // it('builds a query with complex variables', () => {
      //   const input = { input: 'query' };
      //   const query = queryBuilder.build({ response: [input, PrimitiveWithInput] });
      //   expect(query).toMatchObject({ response: [input, [{ take: 50 }, { id: true, name: true }]] });
      // });
    });
  });
});
