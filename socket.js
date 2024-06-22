import { io } from 'socket.io-client';

const URL = process.env.SOCKET_URL;

export const socket = (token) => {
  return io(URL, { path: '/socket', query: { token } });
};
