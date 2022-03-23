import { ExecutionContext } from '@src/config/execution-context.config';
import { consoleLogger } from '@src/config/logger.config';
import { seedOptions } from '@src/config/seed.config';
import { factories } from '../factories';

export class Seeder {
  static entityClass;

  static size() {
    const size = seedOptions[this.entityClass.name]?.size;

    if (!size) {
      throw new Error(
        `Size for ${this.entityClass.name} in seed options is not set.`
      );
    }

    return size;
  }

  static async run() {
    const entityManager = ExecutionContext.getCurrent()?.getEntityManager();

    if (!entityManager) {
      throw new Error(
        `Entity manager for ${
          ExecutionContext.getCurrent()?.constructor.name
        } is not set.`
      );
    }

    const repository = entityManager.getRepository(this.entityClass);

    const factoryClass = factories[this.entityClass.name];

    if (!factoryClass) {
      throw new Error(`No factory class for ${this.entityClass.name}`);
    }

    const size = this.size();

    const newEntities = [...Array(size)].map(() => factoryClass.create());

    await repository.save(newEntities);

    consoleLogger.info(
      `Saved ${size} record${size > 1 ? 's' : ''} of ${this.entityClass.name}.`
    );
  }
}
