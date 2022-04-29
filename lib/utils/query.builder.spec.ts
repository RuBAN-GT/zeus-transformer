import { GlobalsManager } from '../core';
import { Field } from '../decorators';
import { Entity } from '../decorators/entity.decorator';
import { QueryBuilder } from './query.builder';

class Primitive {
  @Field() public id: number | string;
  @Field() public name: string;
}

class Response {
  @Field() response: Primitive;
}

class Collection {
  @Field({ type: Primitive }) collection: Primitive[];
}

@Entity({ args: { take: 50 } })
class CollectionWithInput {
  @Field({ type: Primitive }) public collection: Primitive[];
}

describe('QueryBuilder', () => {
  const queryBuilder = new QueryBuilder(GlobalsManager.getEntityManager());

  describe('#build', () => {
    describe('static queries', () => {
      it('builds a query from primitive', () => {
        const query = queryBuilder.build(Primitive);
        expect(query).toMatchObject({ id: true, name: true });
      });

      it('builds sub-query', () => {
        const query = queryBuilder.build({ response: Primitive });
        expect(query).toMatchObject({ response: { id: true, name: true } });
      });

      it('builds combined sub-query', () => {
        const query = queryBuilder.build({ response: Primitive, total: true });
        expect(query).toMatchObject({ response: { id: true, name: true }, total: true });
      });

      it('builds parent fields entities', () => {
        const query = queryBuilder.build(Response);
        expect(query).toMatchObject({ response: { id: true, name: true } });
      });

      it('builds collection of fields entities using `type` helper', () => {
        const query = queryBuilder.build(Collection);
        expect(query).toMatchObject({ collection: { id: true, name: true } });
      });
    });

    describe.only('queries with variables', () => {
      it('builds a query with variable', () => {
        const result = queryBuilder.build(CollectionWithInput);

        expect(Array.isArray(result)).toBeTruthy();

        const [query, vars] = result as [Record<string, any>, Record<string, any>];
        expect(query).toMatchObject({ id: true, name: true });
        expect(vars).toMatchObject({ take: 50 });
      });
    });
  });
});
