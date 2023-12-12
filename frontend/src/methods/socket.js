import socketClient from 'socket.io-client';

export const socket = socketClient("http://127.0.0.1:5000");