import { Notification } from "../models/notification.model.js"

export const getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req._id
        })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('senderId', 'name profilePicture');

        return res.status(200).json({
            success: true, 
            notifications 
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};
  
export const markAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                _id: { $in: req.body.notificationIds },
                recipientId: req.user._id
            },
            { $set: { isRead: true } }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to update notifications" });
    }
};