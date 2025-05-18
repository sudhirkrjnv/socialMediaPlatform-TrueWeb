import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications, markNotificationsAsRead as markSingle, markChatListNotificationsAsRead as markMultiple, markAllNotificationsAsRead as markAll } from '@/middleware/notification.middleware.js';

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
                if ((groupId && n.groupId === groupId) || (senderId && n.senderId === senderId)) {
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

// Thunk Actions
export const loadNotifications = () => async (dispatch) => {
  try {
    const notifications = await fetchNotifications();
    dispatch(chatSlice.actions.setNotification(notifications));
  } catch (error) {
    console.error("Error loading notifications:", error);
  }
};

export const markNotificationAsRead = (notificationIds) => async (dispatch) => {
  try {
    dispatch(_markNotificationAsRead({ notificationIds }));
    await markSingle(notificationIds);
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  }
};

export const markChatListNotificationAsRead = ({ groupId, senderId }) => async (dispatch) => {
  try {
    dispatch(_markChatListNotificationsAsRead({ groupId, senderId }));
    await markMultiple({ groupId, senderId });
  } catch (error) {
    console.error("Error in markChatListNotifications:", error);
  }
};

export const markAllNotificationAsRead = () => async (dispatch) => {
  try {
    dispatch(_markAllNotificationsAsRead());
    await markAll();
  } catch (error) {
    console.error("Error in markAllNotifications:", error);
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
    _markChatListNotificationAsRead,
    _markAllNotificationsAsRead,
    closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;