import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: [],
    },
    reducers: {
        setNotification: (state, action) => {
            state.notification = typeof action.payload === 'function' 
                ? action.payload(state.notification || [])
                : action.payload;
        },
        _markChatListNotificationsAsRead: (state, action) => {
            const { groupId, senderId } = action.payload;

            state.notification = state.notification.map(n => {
                if ((groupId && n.groupId === groupId) || (senderId && n.senderId?._id === senderId)) {
                    return { ...n, isRead: true };
                }
                return n;
            });
        },
        _markNotificationAsRead: (state, action) => {
            const { notificationIds } = action.payload;

            state.notification = state.notification.map(n => 
                notificationIds.includes(n._id)
                    ? { ...n, isRead: true }
                    : n
            );
        },
        _markAllNotificationsAsRead: (state) => {
            state.notification = state.notification.map(n => ({
                ...n,
                isRead: true,
            }));
        },
    },
});

export const loadNotifications = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/notifications', { withCredentials: true });
        dispatch(notificationSlice.actions.setNotification(response.data.notifications));
    } catch (error) {
        console.error("Error loading notifications:", error.response?.data?.message || error.message);
    }
};

export const markNotificationAsRead = (notificationIds) => async (dispatch) => {
  try {
        dispatch(notificationSlice.actions._markNotificationAsRead({ notificationIds }));
        const response = await axios.patch(`http://localhost:8000/api/v1/notifications/mark-as-read/${notificationIds}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        return { success: false };
    }
};

export const markChatListNotificationAsRead = ({ groupId, senderId }) => async (dispatch, getState) => {
  try {
        dispatch(notificationSlice.actions._markChatListNotificationsAsRead({ groupId, senderId }));
        const chatId = getState().chat.selectedChatType === 'Group' ? groupId : senderId;
        const response = await axios.post(`http://localhost:8000/api/v1/notifications/mark-chat-list-read/${chatId}`, {},{ withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error marking chat list notifications:", error);
        return { success: false };
    }
};

export const markAllNotificationAsRead = () => async (dispatch) => {
    try {
        dispatch(notificationSlice.actions._markAllNotificationsAsRead());
        const response = await axios.get('http://localhost:8000/api/v1/notifications/mark-all-read', { withCredentials: true });
        if (response.data.success) {
            console.log("All notifications marked as read!");
        } else {
            console.error("Failed to mark all notifications as read.");
        }
    } catch (error) {
        console.error("Error in markAllNotificationsAsRead!", error);
    }
};

export const {
    setNotification,
    _markNotificationAsRead,
    _markChatListNotificationsAsRead,
    _markAllNotificationsAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;