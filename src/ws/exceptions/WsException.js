export class WsException extends Error {
  /**
   * @param {string} [message]
   * @param {boolean} [shouldDisconnect]
   */
  constructor(message, shouldDisconnect = false) {
    super(message);
    this.shouldDisconnect = shouldDisconnect;
  }
}
