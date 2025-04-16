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

    const disconnect = (socket) => {
        console.log(`Client Disconnected : ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                io.emit('userStatus', { userId, status: 'inactive' });
                break;
            }
        }
    };

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            io.emit('userStatus', { userId, status: 'active' });
            console.log(`User connected: ${userId} with Socket Id: ${socket.id}`);
        } else {
            console.log('User Id not provided during connection');
        }
        
        socket.on("sendMessage", async (message) => {
            const senderSocketId = userSocketMap.get(message.sender);
            const recipientSocketId = userSocketMap.get(message.recipient);
        
            const createdMessage = await Message.create(message);
            
            const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "username name profilePicture")
                .populate("recipient", "username name profilePicture");
        
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receiveMessage", messageData);
                io.to(recipientSocketId).emit("updateIndividualList", messageData);
            }
            if (senderSocketId) {
                io.to(senderSocketId).emit("messageSent", messageData);
                io.to(senderSocketId).emit("updateIndividualList", messageData);
            }
        });
        
        socket.on("send_Group_Message", async (message) => {

            const { groupId, sender, content, messageType, fileUrl } = message;
        
            const createdMessage = await Message.create({
                sender,  recipient: null,
                content,
                messageType,
                fileUrl,
                timestamp: new Date(),
            });
            
            const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "username name profilePicture")
                .exec();

            await Group.findByIdAndUpdate(groupId, {
                $push: {messages: createdMessage._id},
            })
            const group =  await Group.findById(groupId).populate("members");

            const finalData = {...messageData._doc, groupId:group._id};

            if(group && group.members){
                group.members.forEach((member)=>{
                    const memberSocketId = userSocketMap.get(member._id.toString());
                    if(memberSocketId){
                        io.to(memberSocketId).emit("receive_Group_Message", finalData);
                    }

                })
                const adminSocketId = userSocketMap.get(group.admin._id.toString());
                if(adminSocketId){
                    io.to(adminSocketId).emit("receive_Group_Message", finalData);
                }

            }
        });

        socket.on('disconnect', () => disconnect(socket));
    });
};