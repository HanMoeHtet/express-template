import {
  executionContextStorage,
  WsExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (socket, next) => {
  executionContextStorage.enterWith(new WsExecutionContext(socket, next));
  next();
};
