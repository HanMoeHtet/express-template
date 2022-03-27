import { DateTime } from 'luxon';
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
      transformer: {
        from: (value) => DateTime.fromSQL(value).toUnixInteger(),
        to: (value) => {
          if (value instanceof Date) {
            return DateTime.fromJSDate(value).toSQLDate();
          }

          if (typeof value === 'number') {
            return DateTime.fromSeconds(value).toSQLDate();
          }

          throw new Error(`Invalid date format for value: ${value}`);
        },
      },
    },
  },
});
