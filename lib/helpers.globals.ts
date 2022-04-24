import { EntityManager } from './core';
import { QueryBuilder } from './utils';

export const entityGlobalManager = new EntityManager();
export const queryGlobalBuilder = new QueryBuilder(entityGlobalManager);
