import { ExecutionContext } from '@src/config/execution-context.config';

export class Factory {
  static entityClass;

  static definitions() {
    return {};
  }

  static async create(size = 1) {
    const ctx = ExecutionContext.getCurrent();

    if (!ctx) {
      throw new Error('Current execution context is not set.');
    }

    if (!ctx.entityManager) {
      throw new Error(
        'Entity manager for current execution context is not set.'
      );
    }

    const entityManager = ctx.entityManager;

    const repository = entityManager.getRepository(this.entityClass);

    const newEntities = [...Array(size)].map(() => this.getRaw());

    const createdEntities = await repository.save(newEntities);

    return createdEntities;
  }

  static getRaw() {
    const entity = new this.entityClass();

    Object.entries(this.definitions()).map(
      ([key, value]) => (entity[key] = value)
    );

    return entity;
  }
}
