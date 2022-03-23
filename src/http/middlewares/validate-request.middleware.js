import { ValidationException } from '../exceptions/validation.exception';

export const validateRequest = (
  /** @type {import('joi').ObjectSchema}  */ schema
) => {
  const handle = (req, res, next) => {
    const { value, error } = schema.validate(
      {
        params: req.params,
        query: req.query,
        body: req.body,
      },
      {
        allowUnknown: true,
        abortEarly: false,
        presence: 'required',
      }
    );
    if (error) {
      next(new ValidationException(error.details, error.message));
      return;
    }

    req.body = value.body;
    req.params = value.params;
    req.query = value.query;

    next();
  };

  Object.defineProperty(handle, 'name', { value: 'validateRequest' });

  return handle;
};
