import { Server } from 'socket.io';
import { Message } from './models/message.models.js';
import {Group} from './models/group.model.js'


export const setupSocket = (server) => {
    
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    const userSocketMap = new Map();

    const getOnlineUsers = () => {
        return Array.from(userSocketMap.keys());
    };

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            if (userSocketMap.has(userId)) {
              userSocketMap.get(userId).add(socket.id);
            } else {
              userSocketMap.set(userId, new Set([socket.id]));
            }
            console.log(`User connected: ${userId} with Socket Id: ${socket.id}`);
            io.emit('onlineUsers', getOnlineUsers());
        } else {
            console.log('User Id not provided during connection');
        }
        
        socket.on("sendMessage", async (message) => {
            const messageData = await Message.create(message)
                .then(m => m.populate("sender recipient", "username name profilePicture"));

            [message.sender, message.recipient].forEach(userId => {
                const socketId = userSocketMap.get(userId.toString());
                if (socketId) io.to(socketId).emit("receiveMessage", messageData);
            });
        });

        socket.on("send_Group_Message", async (message) => {
            const messageData = await Message.create({
                ...message,
                recipient: null,
                timestamp: new Date()
            }).then(m => m.populate("sender", "username name profilePicture"));

            const group = await Group.findByIdAndUpdate(
                message.groupId,
                { $push: { messages: messageData._id } },
                { new: true, populate: "members admin" }
            );

            if (!group) return;

            [...group.members, group.admin].forEach(member => {
                const socketId = userSocketMap.get(member._id.toString());
                if (socketId) io.to(socketId).emit("receive_Group_Message", { ...messageData._doc, groupId: group._id });
            });
        });

        socket.on("typing", (data) => {
            const recipientSocketId = userSocketMap.get(data.recipient);
            if(recipientSocketId){
                io.to(recipientSocketId).emit("typing", data.sender);
            }
        });

        socket.on('disconnect', () => {
            if (userId && userSocketMap.has(userId)) {
              const userSockets = userSocketMap.get(userId);
              userSockets.delete(socket.id);
              if (userSockets.size === 0) {
                userSocketMap.delete(userId);
              }
              io.emit('onlineUsers', getOnlineUsers());
            }
            console.log(`Client Disconnected : ${socket.id}`);
        });
    });
};