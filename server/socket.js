import { Server } from 'socket.io';
import { sendMessage } from './controller/message.controller.js';

export const setupSocket = (server) => {
    
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected : ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with Socket Id: ${socket.id}`);
        } else {
            console.log('User Id not provided during connection');
        }

        socket.on("sendMessage", async (message) => {
            await sendMessage(message, io, userSocketMap);
        });

        socket.on('disconnect', () => disconnect(socket));
    });
};