import { AsyncLocalStorage } from 'async_hooks';

export const executionContextStorage = new AsyncLocalStorage();

export class ExecutionContext {
  constructor(data) {
    this.data = data;
  }

  static getCurrent() {
    return executionContextStorage.getStore();
  }
}

export class HttpExecutionContext extends ExecutionContext {
  constructor(req, res, next, data = {}) {
    super(data);
    this.req = req;
    this.res = res;
    this.next = next;
  }
}

export class WsExecutionContext extends ExecutionContext {
  constructor(socket, event, next, data = {}) {
    super(data);
    this.socket = socket;
    this.event = event;
    this.next = next;
  }
}
