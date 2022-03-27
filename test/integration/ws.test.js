import { closeApp, initApp } from '@src/config/app.config';
import { PORT } from '@src/config/env.config';
import { initLang } from '@src/config/lang.config';
import { closeWs, initWs } from '@src/config/ws.config';
import io from 'socket.io-client';

/** @type {import('socket.io-client').Socket} */
let socket;
beforeAll(async () => {
  await initLang();
  await initApp();
  await initWs();

  socket = io(`http://localhost:${PORT}`, {
    query: {
      lng: 'my',
    },
  });

  await new Promise((resolve, reject) => {
    socket.on('connect', () => {
      resolve(null);
    });

    socket.on('connect_error', (err) => {
      reject(err);
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
  closeWs();
  closeApp();
});
