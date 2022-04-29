import { Field } from '../decorators';
import { Chain } from './dummy/zeus';

import { queryGlobalBuilder } from '../helpers.globals';

class Card {
  @Field() public id!: string;
  @Field() public name!: string;
}

class ListCards {
  @Field({ type: Card }) public listCards!: Card[];
}

const chain = Chain('https://faker.graphqleditor.com/a-team/olympus/graphql');

xdescribe('Basic workflow', () => {
  it('simple request', async () => {
    const query = queryGlobalBuilder.build(ListCards);
    const response: any = await chain('query')(query as any);

    await chain('query')({ cardById: [{ cardId: 'hello' }, { id: true }] })

    expect(Array.isArray(response.listCards)).toBe(true);
    expect(response.listCards.length > 0).toBe(true);
    expect(typeof response.listCards[0].id).toBe('string');
  });
});
