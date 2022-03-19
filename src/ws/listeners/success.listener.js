import * as successService from '@src/services/success.service';

export const registerSuccessListeners = (
  /** @type {import('socket.io').Socket} */ socket
) => {
  socket.on('success', () => {
    socket.emit('message', successService.success());
  });
};
