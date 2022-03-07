import { v4 as uuidV4 } from 'uuid';

export const requestIdentifier = (req, res, next) => {
  req.headers['x-request-id'] = uuidV4();
  next();
};
