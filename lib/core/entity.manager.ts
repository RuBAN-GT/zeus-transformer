import { EntityMetadata } from './entity.metadata';

const getProto = (target: Function): Function => (target.prototype || target);

export class EntityManager {
  protected readonly entities: Map<Function, EntityMetadata>;

  constructor() {
    this.entities = new Map();
  }

  public registerEntity<T>(entity: Function): EntityMetadata {
    const metadata = this.findEntity(entity);
    if (metadata) {
      return metadata;
    }

    const proto = getProto(entity);
    const entityMetadata = new EntityMetadata(proto);
    this.entities.set(proto, entityMetadata);

    return entityMetadata;
  }

  public findEntity<T>(entity: Function): EntityMetadata | undefined {
    return this.entities.get(getProto(entity));
  }

  public hasEntity<T>(entity: Function): boolean {
    return this.entities.has(getProto(entity));
  }
}
