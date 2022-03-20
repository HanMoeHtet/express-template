import { EntitySchema } from 'typeorm';

export class User {
  /**
   * @type {string | undefined}
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
}

export const UserSchema = new EntitySchema({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    name: {
      type: 'varchar',
    },
    birthDate: {
      type: 'date',
    },
  },
});
