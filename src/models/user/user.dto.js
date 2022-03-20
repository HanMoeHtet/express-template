export class CreateUserDto {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {Date}
   */
  birthDate;

  constructor({ name, birthDate }) {
    this.name = name;
    this.birthDate = birthDate;
  }
}

export class UpdateUserDto {
  /**
   * @type {string}
   */
  id;

  /**
   * @type {string | undefined}
   */
  name;

  /**
   * @type {Date | undefined}
   */
  birthDate;

  constructor({ id, name, birthDate }) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
  }
}
