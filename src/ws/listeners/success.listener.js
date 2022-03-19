import * as apiService from '@src/services/api.service';

export const registerSuccessListeners = (
  /** @type {import('socket.io').Socket} */ socket
) => {
  socket.on('success', () => {
    socket.emit('message', apiService.success());
  });
};
