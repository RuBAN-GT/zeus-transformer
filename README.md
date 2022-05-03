# Zeus Transformer

The set of utils and decorators helping to build and map zeus queries using models.

## Install

1. Setup `reflect-metadata` package and reflect api at your environment.
2. Add `zeus-transformer` package to your dependencies using your package manager.

## Usage

> TODO

### Examples

```typescript
import { queryBuilder, entityConverter, Entity, Field } from 'zeus-transformer';

@Entity()
class Card {
  @Field() public id!: string;
  @Field() public name!: string;

  public log(): void {
    console.info(this.id);
  }
}

const chain = Chain('https://faker.graphqleditor.com/a-team/olympus/graphql');
const query = queryBuilder.build({ listCards: Card }); // => { listCards: { id: true, name: true } }

const rawResponse = await chain('query', query);
const response = entityConverter.convert({ listCards: Card }, rawResponse);
response.listCards[0].log() // logs id
```
