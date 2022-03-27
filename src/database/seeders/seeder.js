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
    const factoryClass = factories[this.entityClass.name];

    if (!factoryClass) {
      throw new Error(`No factory class for ${this.entityClass.name}`);
    }

    await factoryClass.create(this.size());

    consoleLogger.info(
      `Saved ${this.size()} record${this.size() > 1 ? 's' : ''} of ${
        this.entityClass.name
      }.`
    );
  }
}
