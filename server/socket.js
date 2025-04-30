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

    const userSocketsMap = new Map();

    const addUserSocket = (userId, socketId) => {
        if (!userSocketsMap.has(userId)) {
            userSocketsMap.set(userId, new Set());
        }
        userSocketsMap.get(userId).add(socketId);
    };
    const removeUserSocket = (userId, socketId) => {
        if (!userSocketsMap.has(userId)) return;
        const sockets = userSocketsMap.get(userId);
        sockets.delete(socketId);
        if (sockets.size === 0) {
            userSocketsMap.delete(userId);
        }
    };

    const getOnlineUsers = () => {
        return Array.from(userSocketsMap.keys());
    };


    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            addUserSocket(userId, socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`);
            console.log("Current userSocketsMap:", [...userSocketsMap.entries()]);

            io.emit('onlineUsers', getOnlineUsers());
        }
        
        socket.on("sendMessage", async (message) => {
            const messageData = await Message.create(message)
                .then(m => m.populate("sender recipient", "username name profilePicture"));

            [message.sender, message.recipient].forEach(userId => {
                const socketIds = userSocketsMap.get(userId?.toString());
                if (socketIds) {
                    socketIds.forEach(sid => io.to(sid).emit("receiveMessage", messageData));
                }
            });
        });

        socket.on("newGroupCreated", ({ group, memberIds }) => {
            memberIds.forEach(userId => {
                const socketIds = userSocketsMap.get(userId?.toString());
                if (socketIds) {
                    socketIds.forEach(sid => io.to(sid).emit("addNewGroup", group));
                }
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
                const socketIds = userSocketsMap.get(member._id.toString());
                if (socketIds) {
                    socketIds.forEach(sid => io.to(sid).emit("receive_Group_Message", { ...messageData._doc, groupId: group._id }));
                }
            });
        });

        socket.on("typing", (data) => {
            const recipientSocketIds = userSocketsMap.get(data.recipient);
            if (recipientSocketIds) {
                recipientSocketIds.forEach(sid => io.to(sid).emit("typing", data.sender));
            }
        });

        socket.on('disconnect', ()=>{
            if (userId) {
                removeUserSocket(userId, socket.id);
                console.log(`Socket ${socket.id} of user ${userId} disconnected`);
                console.log("Current userSocketsMap:", [...userSocketsMap.entries()]);

                io.emit('onlineUsers', getOnlineUsers());
            }
        });
    });
};