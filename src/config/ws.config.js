import { server as httpServer } from '@src/config/app.config';
import { handler } from '@src/ws/exceptions/handler';
import { registerSuccessListeners } from '@src/ws/listeners/success.listener';
import { initExecutionContext } from '@src/ws/middlewares/execution-context.middleware';
import { i18nextMiddleware } from '@src/ws/middlewares/i18next.middleware';
import { Server } from 'socket.io';
import { corsOptions } from './cors.config';

export const io = new Server(httpServer, {
  serveClient: false,
  cors: corsOptions,
});

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
