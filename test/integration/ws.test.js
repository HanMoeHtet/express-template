import { init as initApp, server } from '@src/config/app.config';
import io from 'socket.io-client';
import '@src/config/ws.config';
import { PORT } from '@src/config/env.config';

/** @type {import('socket.io-client').Socket} */
let socket;
beforeAll((done) => {
  initApp().then(() => {
    socket = io(`http://localhost:${PORT}`, {
      query: {
        lng: 'my',
      },
    });

    socket.on('connect', done);

    socket.on('connect_error', (err) => {
      done(err.message);
    });
  });
});

test('success event to server should return Success!', (done) => {
  socket.on('message', (message) => {
    try {
      expect(message).toBe('အောင်မြင်ပါသည်။');
      done();
    } catch (e) {
      done(e);
    }
  });
  socket.emit('success');
});

afterAll(() => {
  socket.close();
  server.close();
});
