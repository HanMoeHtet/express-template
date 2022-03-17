import {
  executionContextStorage,
  WsExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (socket, event, next) => {
  executionContextStorage.run(
    new WsExecutionContext(socket, event, next),
    () => {
      next();
    }
  );
};
