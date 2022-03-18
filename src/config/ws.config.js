import { server as httpServer } from '@src/config/app.config';
import * as apiService from '@src/services/api.service';
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

  socket.on('success', () => {
    socket.emit('message', apiService.success());
  });
});
