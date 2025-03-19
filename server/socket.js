import { Server } from 'socket.io';
import { Message } from './models/message.models.js';

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
    const sendMessage = async(message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id)
            .populate("sender","username name")
            .populate("recipient","username name");
        
        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage", messageData);
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage", messageData);
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
            await sendMessage(message);
        });

        socket.on('disconnect', () => disconnect(socket));
    });
};