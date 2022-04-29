import { ComplexTarget } from '../defs';
import { EntityMetadata, EntityOptions } from './entity.metadata';

const getProto = (target: ComplexTarget): ComplexTarget => (target.prototype || target);

export class EntityManager {
  protected readonly entities: Map<ComplexTarget, EntityMetadata>;

  constructor() {
    this.entities = new Map();
  }

  public registerEntity<T>(entity: ComplexTarget<T>, options: EntityOptions = {}): EntityMetadata {
    const metadata = this.findEntity(entity);
    if (metadata) {
      return metadata;
    }

    const proto = getProto(entity);
    const entityMetadata = new EntityMetadata(proto, options);
    this.entities.set(proto, entityMetadata);

    return entityMetadata;
  }

  public findEntity<T>(entity: ComplexTarget<T>): EntityMetadata | undefined {
    return this.entities.get(getProto(entity));
  }

  public hasEntity<T>(entity: ComplexTarget<T>): boolean {
    return this.entities.has(getProto(entity));
  }
}
