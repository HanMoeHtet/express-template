import { AsyncLocalStorage } from 'async_hooks';

export const executionContextStorage = new AsyncLocalStorage();

export class ExecutionContext {
  constructor(data) {
    this.data = data;
  }

  /**
   * @returns {ExecutionContext | undefined}
   */
  static getCurrent() {
    return executionContextStorage.getStore();
  }

  /**
   * @returns {import('i18next').TFunction | undefined}
   */
  getTranslator() {
    return;
  }

  /**
   * @returns {import('typeorm').EntityManager | undefined}
   */
  getEntityManager() {
    return;
  }
}

export class HttpExecutionContext extends ExecutionContext {
  constructor(req, res, next, data = {}) {
    super(data);
    this.req = req;
    this.res = res;
    this.next = next;
  }

  /**
   * @returns {HttpExecutionContext | undefined}
   */
  static getCurrent() {
    return executionContextStorage.getStore();
  }

  getTranslator() {
    return this.req.t;
  }

  getEntityManager() {
    return this.data.entityManager;
  }
}

export class WsExecutionContext extends ExecutionContext {
  constructor(socket, next, data = {}) {
    super(data);
    this.socket = socket;
    this.next = next;
  }

  /**
   * @returns {WsExecutionContext | undefined}
   */
  static getCurrent() {
    return executionContextStorage.getStore();
  }

  getTranslator() {
    return this.socket.data.t;
  }

  getEntityManager() {
    return this.data.entityManager;
  }
}

export class CliExecutionContext extends ExecutionContext {
  constructor(data = {}) {
    super(data);
  }

  /**
   * @returns {CliExecutionContext | undefined}
   */
  static getCurrent() {
    return executionContextStorage.getStore();
  }

  getTranslator() {
    return this.data.t;
  }

  getEntityManager() {
    return this.data.entityManager;
  }
}
