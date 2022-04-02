import { server as httpServer } from '@src/config/app.config';
import { handler } from '@src/ws/exceptions/handler';
import { registerSuccessListeners } from '@src/ws/listeners/success.listener';
import { initExecutionContext } from '@src/ws/middlewares/execution-context.middleware';
import { i18nextMiddleware } from '@src/ws/middlewares/i18next.middleware';
import { Server } from 'socket.io';
import { corsOptions } from './cors.config';
import { client } from './redis.config';
import { createAdapter } from '@socket.io/redis-adapter';

/**
 * @type {import('socket.io').Server}
 */
export let io;

const pubClient = client.duplicate();
const subClient = client.duplicate();

export const initWs = async () => {
  io = new Server(httpServer, {
    serveClient: false,
    cors: corsOptions,
  });

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));

  io.use(i18nextMiddleware);

  io.on('connection', async (socket) => {
    socket.use((event, next) => {
      initExecutionContext(socket, next);
    });

    registerSuccessListeners(socket);

    socket.on('error', (err) => {
      handler(err, socket);
    });
  });
};

export const closeWs = async () => {
  try {
    await pubClient.quit();
  } catch (e) {
    console.log(e);
  }
  await subClient.quit();

  await new Promise((resolve, reject) => {
    io.close((/** @type {any} */ err) => {
      if (err) {
        if (err.code === 'ERR_SERVER_NOT_RUNNING') {
          resolve(null);
          return;
        }
        reject(err.code);
        return;
      }

      resolve(null);
    });
  });
};
