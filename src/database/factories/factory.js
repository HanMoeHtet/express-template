import { ExecutionContext } from '@src/config/execution-context.config';
import { appDataSource } from '@src/config/database.config';

export class Factory {
  static entityClass;

  static definitions() {
    return {};
  }

  static async create(size = 1) {
    const entityManager =
      ExecutionContext.getCurrent()?.getEntityManager() ||
      appDataSource.manager;

    if (!entityManager) {
      throw new Error(
        `Entity manager for ${
          ExecutionContext.getCurrent()?.constructor.name
        } is not set.`
      );
    }

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
