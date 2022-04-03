import { AsyncLocalStorage } from 'async_hooks';

export const executionContextStorage = new AsyncLocalStorage();

export class ExecutionContext {
  /**
   * @type {import('typeorm').EntityManager | undefined}
   */
  _entityManager;

  /**
   * @type {import('i18next').TFunction | undefined}
   */
  _translator;

  constructor({ entityManager, translator }) {
    this.entityManager = entityManager;
    this.translator = translator;
  }

  /**
   * @returns {ExecutionContext | undefined}
   */
  static getCurrent() {
    return executionContextStorage.getStore();
  }

  get entityManager() {
    return this._entityManager;
  }

  set entityManager(entityManager) {
    this._entityManager = entityManager;
  }

  get translator() {
    return this._translator;
  }

  set translator(translator) {
    this._translator = translator;
  }
}

export class HttpExecutionContext extends ExecutionContext {
  constructor(req, res, next, data = {}) {
    super({
      translator: req.t,
      entityManager: data.entityManager,
    });
    this.req = req;
    this.res = res;
    this.next = next;
  }

  get translator() {
    return this.req.t;
  }

  set translator(translator) {
    this.req && (this.req.t = translator);
  }
}

export class WsExecutionContext extends ExecutionContext {
  constructor(socket, next, data = {}) {
    super({
      entityManager: data.entityManager,
      translator: socket.data.t,
    });
    this.socket = socket;
    this.next = next;
  }

  get translator() {
    return this.socket.data.t;
  }

  set translator(translator) {
    this.socket?.data && (this.socket.data.t = translator);
  }
}

export class CliExecutionContext extends ExecutionContext {
  constructor(data = {}) {
    super({
      translator: data.t,
      entityManager: data.entityManager,
    });

    this.args = data.args;
  }
}
