import express from 'express';
import { v4 as uuidV4 } from 'uuid';

/**
 * @param {express.Request} req
 */
export const requestIdentifier = (req, res, next) => {
  req.headers['x-request-id'] = uuidV4();
  next();
};
