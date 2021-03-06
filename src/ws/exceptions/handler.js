import { ENV } from '@src/config/env.config';
import { WsException } from './ws.exception';

export const handler = (
  /** @type {Error} */ err,
  /** @type {import('socket.io').Socket} */ socket
) => {
  if (err instanceof WsException) {
    const isProduction = ENV === 'production';

    if (err.shouldDisconnect) {
      socket.disconnect();
    } else {
      socket.emit('message', {
        message: err.message,
        stack: isProduction ? undefined : err.stack,
      });
    }

    return;
  }

  socket.disconnect();
};
