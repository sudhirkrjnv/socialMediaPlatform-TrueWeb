import mongoose from 'mongoose';
import { Message } from '../models/message.models.js';
import { User } from '../models/user.model.js';
import { Group } from '../models/group.model.js';

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

export const recentUsersList = async (req, res) => {
    try {
        const userId = req.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const messages = await Message.find({
            $or: [{ sender: userObjectId }, { recipient: userObjectId }],
            recipient: { $ne: null } 
        })
        .sort({ timestamp: -1 }) 
        .populate({
            path: "sender recipient",
            select: "username name profilePicture"
        });

        const chatMap = new Map();

        messages.forEach((msg) => {
            const otherUser = msg.sender._id.equals(userObjectId) ? msg.recipient : msg.sender;
            if (!chatMap.has(otherUser._id.toString())) {
                chatMap.set(otherUser._id.toString(), {
                    _id: otherUser._id,
                    username: otherUser.username,
                    name: otherUser.name,
                    profilePicture: otherUser.profilePicture,
                    lastMessageTime: msg.timestamp,
                    lastMessage: msg.message
                });
            }
        });

        const list = Array.from(chatMap.values()).sort((a, b) => b.lastMessageTime - a.lastMessageTime);

        return res.status(200).json({ success: true, list });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const CreateGroup = async (req, res) => {
    try {
        const { name, members } = req.body;
        const userId = req.id;

        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(404).send("Admin not exists");
        }
        
        const validMembers = await User.find({_id:{$in:members}});

        if (validMembers.length !== members.length) {
            return res.status(400).send("Some are not valid users");
        }

        const newGroup = new Group({
            name,
            members,
            admin: userId
        });
        await newGroup.save()
            
        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            group: newGroup
        });
            

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during group creation",
        });
    }
};