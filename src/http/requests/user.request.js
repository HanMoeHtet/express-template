import Joi from 'joi';
import { DateTime } from 'luxon';

export const getUserRequestSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().regex(/\d+/),
  }),
});

export const createUserRequestSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(1).max(200),
    birthDate: Joi.date()
      .timestamp('unix')
      .less(
        DateTime.utc()
          .minus({
            year: 18,
          })
          .toJSDate()
      )
      .greater(
        DateTime.utc()
          .minus({
            year: 140,
          })
          .toJSDate()
      ),
  }),
});

export const updateUserRequestSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().regex(/\d+/),
  }),

  body: Joi.object({
    name: Joi.string().min(1).max(200).optional(),
    birthDate: Joi.date()
      .timestamp('unix')
      .less(
        DateTime.utc()
          .minus({
            year: 18,
          })
          .toJSDate()
      )
      .greater(
        DateTime.utc()
          .minus({
            year: 140,
          })
          .toJSDate()
      )
      .optional(),
  }),
});

export const deleteUserRequestSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().regex(/\d+/),
  }),
});
