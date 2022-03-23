export class Factory {
  static entityClass;

  static definitions() {
    return {};
  }

  static create() {
    const entity = new this.entityClass();

    Object.entries(this.definitions()).map(
      ([key, value]) => (entity[key] = value)
    );

    return entity;
  }
}
