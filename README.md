# Zeus Transformer

The set of utils and decorators helping to build and map zeus queries using models.

Example:

```typescript
class Card {
  @Field() public id!: string;
  @Field() public name!: string;
}

class ListCards {
  @Field({ type: Card }) public listCards!: Card[];
}

const chain = Chain('https://faker.graphqleditor.com/a-team/olympus/graphql');
const query = queryGlobalBuilder.build(ListCards); // => { listCards: { id: true, name: true } }
```
