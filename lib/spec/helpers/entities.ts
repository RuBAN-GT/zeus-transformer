import { Entity, Field } from '../../decorators';

@Entity()
export class Primitive {
  @Field() public id: number | string;
  @Field() public name: string;
}

@Entity()
export class Data {
  @Field() data: Primitive;
}

@Entity()
export class Collection {
  @Field({ type: Primitive }) collection: Primitive[];
}

@Entity({ args: { take: 50 } })
export class PrimitiveWithInput {
  @Field() public id: number | string;
  @Field() public name: string;
}

@Entity({ args: () => ({ take: 50 }) })
export class PrimitiveWithFuncInput {
  @Field() public id: number | string;
  @Field() public name: string;
}

@Entity({ args: (context: any) => ({ take: context.take }) })
export class PrimitiveWithContextInput {
  @Field() public id: number | string;
  @Field() public name: string;
}
