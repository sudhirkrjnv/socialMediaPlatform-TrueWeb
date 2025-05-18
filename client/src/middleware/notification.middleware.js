import axios from 'axios';

export const fetchNotifications = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/notifications', {withCredentials: true});
        return response.data.notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
};

export const markNotificationsAsRead = async (notificationIds) => {
    try {
        const response = await axios.patch(
            'http://localhost:8000/api/v1/notifications/mark-as-read',
            { notificationIds },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        return { success: false };
    }
};

export const markChatListNotificationsAsRead = async ({ groupId, senderId }) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/notifications/mark-chat-list-read',
            { groupId, senderId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error marking chat list notifications:", error);
        return { success: false };
    }
};

export const markAllNotificationsAsRead = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/notifications/mark-all-read', 
            {}, 
            { withCredentials: true } 
        );
        return response.data;
    } catch (error) {
        console.error("Error marking all notifications:", error);
        return { success: false };
    }
};