import { Server } from 'socket.io';
import { Message } from './models/message.models.js';
import {Group} from './models/group.model.js'
import { User } from './models/user.model.js'

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
            
            //console.log("Message Data:", messageData);

            const senderSocketIds = userSocketsMap.get(message.sender?.toString());
            if (senderSocketIds) {
                senderSocketIds.forEach(sid => io.to(sid).emit("receiveMessage", {
                    ...messageData._doc, 
                    status: 'sent'
                }));
            }

            const recipientSocketIds = userSocketsMap.get(message.recipient?.toString());
            if (recipientSocketIds) {

                await Message.findByIdAndUpdate(messageData._id, { status: 'delivered' });

                recipientSocketIds.forEach(sid => {
                    io.to(sid).emit("receiveMessage", {
                        ...messageData._doc,
                        status: 'delivered'
                    })
                    io.to(sid).emit("getNotification", {
                        senderId: message.sender,
                        recipientId: message.recipient,
                        isRead: false,
                        date: new Date(),
                        content: message.content || "New message"
                    });
                });
                if(senderSocketIds){
                    senderSocketIds.forEach(sid=>io.to(sid).emit("messageStatusUpdate", {
                        messageId: messageData._id,
                        status: 'delivered'
                    }))
                }
            }
            
        });

        socket.on("messageRead", async ({ messageId, readerId }) => {
            const message = await Message.findById(messageId);
            if (!message) return;

            await Message.findByIdAndUpdate(messageId, { status: 'read' });

            const senderSocketIds = userSocketsMap.get(message.sender?.toString());
            if (senderSocketIds) {
                senderSocketIds.forEach(sid => io.to(sid).emit("messageStatusUpdate", {
                    messageId,
                    status: 'read'
                }));
            }
        });

        socket.on("newGroupCreated", ({ group, memberIds }) => {
            memberIds.forEach(userId => {
                const socketIds = userSocketsMap.get(userId?.toString());
                if (socketIds) {
                    socketIds.forEach(sid => {
                        io.to(sid).emit("addNewGroup", group);
                        io.to(sid).emit("receive_Group_Message", {
                            ...group.systemMessage,
                            groupId: group._id,
                            sender: group.admin
                        });
                    });
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
                    socketIds.forEach(sid =>{
                        io.to(sid).emit("receive_Group_Message", { ...messageData._doc, groupId: group._id, timestamp: messageData.timestamp });
                        if (member._id.toString() !== message.sender.toString()) {
                            io.to(sid).emit("getNotification", {
                                groupId: group._id,
                                isRead: false,
                                date: new Date(),
                                content: message.content || "New group message",
                                type: "group"
                            });
                        }
                    }) 
                }
            });
        });

        socket.on("typing", async(data) => {
            try {
                if (data.groupId) {
                    const sender = await User.findById(data.sender).select('name username');
                    const group = await Group.findById(data.groupId).populate("members admin");
                    
                    [...group.members, group.admin].forEach(member => {
                        if (member._id.toString() !== data.sender) {
                            const socketIds = userSocketsMap.get(member._id.toString());
                            if (socketIds) {
                                socketIds.forEach(sid => io.to(sid).emit("typing", {
                                    senderId: data.sender,
                                    displayName: sender.name || sender.username,
                                    groupId: data.groupId,
                                    isGroup: true
                                }));
                            }
                        }
                    });
                } else {  
                    const recipientSocketIds = userSocketsMap.get(data.recipient);
                    if (recipientSocketIds) {
                        recipientSocketIds.forEach(sid => io.to(sid).emit("typing", {
                            senderId: data.sender,
                            recipient: data.recipient,
                            isGroup: false
                        }));
                    }
                }
                
            } catch (error) {
                console.error("Error in handling typing indicator", error);
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