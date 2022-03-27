import {
  executionContextStorage,
  HttpExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (req, res, next) => {
  // Although AsyncLocalStorage.run should be preferred
  // req.on('end') is messing with the execution context.
  // See https://github.com/nodejs/node/issues/41285
  executionContextStorage.enterWith(new HttpExecutionContext(req, res, next));
  next();
};
