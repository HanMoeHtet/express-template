import {
  executionContextStorage,
  WsExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (socket, next) => {
  executionContextStorage.run(new WsExecutionContext(socket, next), () => {
    next();
  });
};
