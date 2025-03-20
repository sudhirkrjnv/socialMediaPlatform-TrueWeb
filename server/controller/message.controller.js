import mongoose from 'mongoose';
import { Message } from '../models/message.models.js';
import { User } from '../models/user.model.js';

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

export const getListofOneToOneOldUsers = async (req, res) => {
    try {
        const userId = req.id; // Authenticated user ID from middleware

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const list = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: userObjectId },
                        { recipient: userObjectId }
                    ],
                    recipient: { $ne: null } // Ensure recipient exists
                }
            },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userObjectId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" },
                    lastMessage: { $first: "$message" } // Store the last message content
                }
            },
            {
                $lookup: {
                    from: "users", // Ensure this matches your actual MongoDB collection name
                    localField: "_id",
                    foreignField: "_id",
                    as: "listInfo"
                }
            },
            { $unwind: "$listInfo" },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    lastMessage: 1, // Include last message content
                    username: "$listInfo.username",
                    name: "$listInfo.name",
                    profilePicture: "$listInfo.profilePicture"
                }
            },
            { $sort: { lastMessageTime: -1 } }
        ]);

        if (!list.length) {
            return res.status(200).json({ success: true, message: "No conversations found.", list: [] });
        }

        return res.status(200).json({ success: true, list });

    } catch (error) {
        console.error("Error in getListofOneToOneOldUsers controller:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// export const getListofOneToOneOldUsers = async (req, res) => {
//     try {
//         const userId = req.id; // Authenticated user ID from middleware
//         const userObjectId = new mongoose.Types.ObjectId(userId);

//         // Find the latest messages where the user is either sender or recipient
//         const messages = await Message.find({
//             $or: [{ sender: userObjectId }, { recipient: userObjectId }],
//             recipient: { $ne: null } // Ensure recipient exists
//         })
//         .sort({ timestamp: -1 }) // Get latest messages first
//         .populate({
//             path: "sender recipient",
//             select: "username name profilePicture"
//         });

//         // Group messages by the other user
//         const chatMap = new Map();
//         messages.forEach((msg) => {
//             const otherUser = msg.sender._id.equals(userObjectId) ? msg.recipient : msg.sender;
//             if (!chatMap.has(otherUser._id.toString())) {
//                 chatMap.set(otherUser._id.toString(), {
//                     _id: otherUser._id,
//                     username: otherUser.username,
//                     name: otherUser.name,
//                     profilePicture: otherUser.profilePicture,
//                     lastMessageTime: msg.timestamp,
//                     lastMessage: msg.message
//                 });
//             }
//         });

//         const list = Array.from(chatMap.values()).sort((a, b) => b.lastMessageTime - a.lastMessageTime);

//         return res.status(200).json({ success: true, list });

//     } catch (error) {
//         console.error("Error in getListofOneToOneOldUsers controller:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };





