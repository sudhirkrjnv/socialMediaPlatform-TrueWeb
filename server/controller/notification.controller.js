import { Notification } from "../models/notification.model.js"

export const getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req._id
        })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('sender', 'name profilePicture');

        return res.status(200).json({
            success: true, 
            notifications 
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
        console.log("failed to get notification")
    }
};
  
export const markAsRead = async (req, res) => {
    try {
        const {notificationId} = req.params;
        const result = await Notification.findByIdAndUpdate(
            {_id: notificationId, recipientId: req.id},
            {$set: {isRead: true}}
        )
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
            {$set: {isRead:true}} )
    
        res.status(result.modifiedCount ? 200 : 404).json({
            success: !!result.modifiedCount,
            message: result.modifiedCount ? 'ChatList notifications mark as read! ' : 'No matching notification found!'
        })
    } catch (error) {
        console.error('Error marking chat notifications:', error);
    }
};
// export const markChatListRead = async (req, res) => {
//     try {
//         const { groupId, senderId } = req.body;
//         const userId = req.user._id;

//         const query = { recipientId: userId, isRead: false };
//         if (groupId) query.groupId = groupId;
//         if (senderId) query.senderId = senderId;

//         const result = await Notification.updateMany(
//             query,
//             { $set: { isRead: true } }
//         );

//         res.json({
//             success: true,
//             modifiedCount: result.modifiedCount
//         });
//     } catch (error) {
//         console.error('Error marking chat notifications:', error);
//         console.log("fails to mark chat list as read ")
//     }
// };

export const markAllRread = async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { recipientId: req.id, isRead: false },
            { $set: { isRead: true } }
        );

        res.json({
            success: true,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error marking all notifications:', error);
        console.log("fails to mark all read ")
    }
};