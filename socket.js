import { io } from 'socket.io-client';

const URL = import.meta.env.SOCKET_URL;

export const socket = (token) => {
  return io(URL, { path: '/socket', query: { token } });
};
