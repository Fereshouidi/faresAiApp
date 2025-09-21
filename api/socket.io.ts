import { io } from "socket.io-client";

export const socket = io('https://fares-ai-omega.vercel.app');

socket.emit('connection', 'hi')