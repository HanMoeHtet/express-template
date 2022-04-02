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

export class UpdateUserAvatarDto {
  /**
   * @type {string}
   */
  id;

  /**
   * @type {string | undefined}
   */
  avatarPath;

  constructor(/** @type {UpdateUserAvatarDto} */ { id, avatarPath }) {
    this.id = id;
    this.avatarPath = avatarPath;
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
