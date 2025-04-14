import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: [],
        recentChatList: [],
        groups: [],
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
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setRecentChatList: (state, action) => {
            state.recentChatList = action.payload;
        },
        addGroups: (state, action) => {
            state.groups = [...action.payload, ...state.groups];
        },
        addMessage: (state, action) => {
            const message = action.payload;
            state.selectedChatMessages.push({
                ...message,
                recipient: state.selectedChatType === 'group'
                    ? message.recipient
                    : message.recipient._id,
                sender: state.selectedChatType === 'group'
                    ? message.sender
                    : message.sender._id,
            });
        },
        setReceivedMessage: (state, action) => {
            const message = action.payload;
            if (
                state.selectedChatType !== undefined &&
                (state.selectedChatData._id === message.sender._id ||
                 state.selectedChatData._id === message.recipient._id)
            ) {
                state.selectedChatMessages.push({
                    ...message,
                    recipient: state.selectedChatType === 'group'
                        ? message.recipient
                        : message.recipient._id,
                    sender: state.selectedChatType === 'group'
                        ? message.sender
                        : message.sender._id,
                });
            }
        },
        updateRecentChatList: (state, action) => {
            const { message, currentUserId } = action.payload;
            
            const otherUser = message.sender._id === currentUserId 
                ? message.recipient 
                : message.sender;
        
            state.recentChatList = state.recentChatList.filter(
                chat => chat._id !== otherUser._id
            );
        
            state.recentChatList.unshift({
                _id: otherUser._id,
                username: otherUser.username,
                name: otherUser.name,
                profilePicture: otherUser.profilePicture,
                lastMessageTime: message.timestamp,
                lastMessage: message.message
            });
        },
        closeChat: (state) => {
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = [];
        },
    },
});

export const { setSelectedChatType, setSelectedChatData, setSelectedChatMessages, addMessage, setReceivedMessage, setRecentChatList, updateRecentChatList, closeChat, recentUsersList } = chatSlice.actions;

export default chatSlice.reducer;