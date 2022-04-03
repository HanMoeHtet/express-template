import { appDataSource } from '@src/config/database.config';
import {
  executionContextStorage,
  WsExecutionContext,
} from '@src/config/execution-context.config';

export const initExecutionContext = (socket, next) => {
  executionContextStorage.enterWith(
    new WsExecutionContext(socket, next, {
      entityManager: appDataSource.manager,
    })
  );
  next();
};
