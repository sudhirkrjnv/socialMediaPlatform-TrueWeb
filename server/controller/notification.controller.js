import { Notification } from "../models/notification.model.js"

export const fetchNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({
            $and: [
                { recipientId: req.id },
                { senderId: { $ne: req.id } }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(50)

        if (!notifications || notifications.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No any notification found ! ",
                notifications: []
            });
        }

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        console.error("Failed to fetch notifications", error)
    }
};
  
export const markAsRead = async (req, res) => {
    try {
        const {notificationId} = req.params;
        const result = await Notification.findByIdAndUpdate(
            {_id: notificationId, recipientId: req.id},
            {$set: {isRead: true}},
            {new: true}
        )
        // Emit socket event
        req.io.emit('notificationRead', {
            notificationId,
            recipientId: req.id
        });
        res.status(200).json({
            success: true,
            message: 'Notification mark as read!',
            notification: result
        })
    } catch (error) {
        console.error("Error marking notification as read", error)
    }
};
export const markChatListRead = async (req, res) => {
    try {
        const {chatId} = req.params;

        const result = await Notification.updateMany( 
            {
                recipientId:req.id,
                $or: [{senderId: chatId}, {groupId: chatId}]
            }, 
            {$set: {isRead:true}} 
        )

        // Emit socket event
        req.io.emit('chatNotificationsRead', {
            recipientId: req.id,
            chatId
        });
    
        res.status(result.modifiedCount ? 200 : 404).json({
            success: !!result.modifiedCount,
            message: result.modifiedCount ? 'ChatList notifications mark as read! ' : 'No matching notification found!'
        })
    } catch (error) {
        console.error('Error marking chat notifications:', error);
    }
};

export const markAllRread = async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { recipientId: req.id, isRead: false },
            { $set: { isRead: true } }
        );
        
        // Emit socket event
        req.io.emit('allNotificationsRead', {
            recipientId: req.id
        });

        res.json({
            success: true,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error marking all notifications:', error);
        console.log("fails to mark all read ")
    }
};