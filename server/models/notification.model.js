import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        content: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        type: { type: String, enum: ['message', 'group', 'system', 'like', 'comment'], default: 'message' }
    },
    { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);