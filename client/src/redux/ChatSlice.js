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
        
            const isGroup = state.selectedChatType === 'Group';
            const isGroupMatched = isGroup && state.selectedChatData?._id === message.groupId;
        
            const isOneToOne = state.selectedChatType === 'OneToOne';
            const isOneToOneMatched =
                isOneToOne &&
                (state.selectedChatData?._id === message.sender._id ||
                 state.selectedChatData?._id === message.recipient._id);
        
            if (isGroupMatched || isOneToOneMatched) {
                state.selectedChatMessages.push({
                    ...message,
                    recipient: isGroup ? message.recipient : message.recipient._id,
                    sender: isGroup ? message.sender : message.sender._id,
                });
            }
        },
        
        setReceivedMessage: (state, action) => {
            const message = action.payload;
            if (
                state.selectedChatType !== undefined &&
                (state.selectedChatData._id === message.sender._id ||
                 state.selectedChatData._id === message.recipient._id)
            ) {
                state.selectedChatMessages.push(message);
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
        updateRecentGroupChatList: (state, action) => {
            const message = action.payload;
            const index = state.groups.findIndex(group => group._id === message.groupId);
        
            if (index !== -1) {
                const [group] = state.groups.splice(index, 1); // Remove from current position
                // Optional: update last message if needed
                group.lastMessage = message.message;
                group.lastMessageTime = message.timestamp;
        
                state.groups.unshift(group); // Add to top
            }
        },

        closeChat: (state) => {
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = [];
        },
    },
});

export const { 
    setSelectedChatType, 
    setGroups, 
    addGroups, 
    setRecentChatList, 
    updateRecentChatList,
    updateRecentGroupChatList, 
    setSelectedChatData, 
    setSelectedChatMessages,
    addMessage, 
    setReceivedMessage,
    closeChat, 
    recentUsersList 
} = chatSlice.actions;

export default chatSlice.reducer;