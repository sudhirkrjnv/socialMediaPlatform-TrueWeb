import { Message } from '../models/message.models.js';

export const sendMessage = async (message, io, userSocketMap) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "username name")
        .populate("recipient", "username name");

    if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", messageData);
    }
};

export const getMessage = async (req, res) => {
    try {
        const user1 = req.id;
        const user2 = req.params.id;

        if (!user1 || !user2) {
            return res.status(400).send("Both user IDs are required");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({ success: true, messages });

    } catch (error) {
        console.error("Error in getMessage controller:", error);
        return res.status(500).send("Internal Server Error");
    }
};
