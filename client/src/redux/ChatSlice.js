import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: [],
        individualList: [],
        groupList: [],
        notification: [],
    },
    reducers: {
        setSelectedChatType: (state, action) => {
            state.selectedChatType = action.payload;
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload;
        },
        setSelectedChatMessages: (state, action) => {
            state.selectedChatMessages = action.payload;
        },
        setIndividualList: (state, action) => {
            state.individualList = action.payload;
        },
        setGroupList: (state, action) => {
            state.groupList = action.payload;
        },
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
        addGroupList: (state, action) => {
            const groupExists = state.groupList.some(g => g._id === action.payload._id);
            if (!groupExists) {
                state.groupList = Array.isArray(action.payload) 
                ? [...action.payload, ...state.groupList]
                : [action.payload, ...state.groupList];
            }
        },
        addMessage: (state, action) => {
            const message = action.payload;
        
            const isGroup = state.selectedChatType === 'Group';
            const isGroupMatched = isGroup && state.selectedChatData?._id === message.groupId;
        
            const isIndividual = state.selectedChatType === 'Individual';
            const isIndividualMatched =
                isIndividual &&
                (state.selectedChatData?._id === message.sender._id ||
                 state.selectedChatData?._id === message.recipient._id);
        
            if (isGroupMatched || isIndividualMatched) {
                state.selectedChatMessages.push({
                    ...message,
                    recipient: isGroup ? message.recipient : message.recipient._id,
                    sender: isGroup ? message.sender : message.sender._id,
                });
            }
        },
        updateMessageStatus: (state, action) => {
            const { messageId, status } = action.payload;
            state.selectedChatMessages = state.selectedChatMessages.map(msg => {
                if (msg._id === messageId) {
                    return { ...msg, status };
                }
                return msg;
            });
        },
            
        updateRecentIndividualChatList: (state, { payload: { message, currentUserId } }) => {
            const otherUser = message.sender._id === currentUserId ? message.recipient : message.sender;
            const existingChat = state.individualList.find(chat => chat._id === otherUser._id);
            
            state.individualList = [
                {
                    ...(existingChat || {
                        _id: otherUser._id,
                        username: otherUser.username,
                        name: otherUser.name,
                        profilePicture: otherUser.profilePicture,
                    }),
                    lastMessage: message.content,
                    lastMessageTime: message.timestamp,
                },
                ...state.individualList.filter(chat => chat._id !== otherUser._id),
            ];
        },
        
        updateRecentGroupChatList: (state, { payload: message }) => {
            const existingGroup = state.groupList.find(group => group._id === message.groupId);
            if (!existingGroup) return;
            
            state.groupList = [
                {
                    ...existingGroup,
                    lastMessage: message.content,
                    lastMessageTime: message.timestamp,
                },
                ...state.groupList.filter(group => group._id !== message.groupId),
            ];
        },

        closeChat: (state) => {
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = [];
        },
    },
});

export const loadNotifications = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/notifications', { withCredentials: true });
        dispatch(chatSlice.actions.setNotification(response.data.notifications));
    } catch (error) {
        console.error("Error loading notifications:", error.response?.data?.message || error.message);
    }
};

export const markNotificationAsRead = (notificationIds) => async (dispatch) => {
  try {
        dispatch(chatSlice.actions._markNotificationAsRead({ notificationIds }));
        const response = await axios.patch(`http://localhost:8000/api/v1/notifications/mark-as-read/${notificationIds}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        return { success: false };
    }
};

export const markChatListNotificationAsRead = ({ groupId, senderId }) => async (dispatch, getState) => {
  try {
        dispatch(chatSlice.actions._markChatListNotificationsAsRead({ groupId, senderId }));
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
        dispatch(chatSlice.actions._markAllNotificationsAsRead());
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
    setSelectedChatType,
    setSelectedChatData, 
    addMessage,
    updateMessageStatus, 
    setSelectedChatMessages,
    setIndividualList, 
    setGroupList, 
    addGroupList, 
    updateRecentIndividualChatList,
    updateRecentGroupChatList,
    setNotification,
    _markNotificationAsRead,
    _markChatListNotificationsAsRead,
    _markAllNotificationsAsRead,
    closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;