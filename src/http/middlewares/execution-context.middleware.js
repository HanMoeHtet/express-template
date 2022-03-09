import {
  executionContextStorage,
  HttpExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (req, res, next) => {
  executionContextStorage.run(new HttpExecutionContext(req, res, next), () => {
    next();
  });
};
