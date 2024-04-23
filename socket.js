import { io } from 'socket.io-client';

// const URL = process.env.SOCKET_URL;
const URL =
  'https://petshop-api-f5ef07c9f712.herokuapp.com';

export const socket = (token) => {
  return io(URL, { path: '/socket', query: { token } });
};
