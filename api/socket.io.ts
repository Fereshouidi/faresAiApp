import { io } from "socket.io-client";

export const socket = io('https://fares-ai-jsp4.vercel.app');

socket.emit('connection', 'hi')