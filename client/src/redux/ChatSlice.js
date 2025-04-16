import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: [],
        individualList: [],
        groupList: [],
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
        setGroupList: (state, action) => {
            state.groupList = action.payload;
        },
        setIndividualList: (state, action) => {
            state.individualList = action.payload;
        },
        addGroupList: (state, action) => {
            state.groupList = [...action.payload, ...state.groupList];
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
            
            
        // updateRecentIndividualChatList: (state, action) => {
        //     const { message, currentUserId } = action.payload;
            
        //     const otherUser = message.sender._id === currentUserId 
        //         ? message.recipient 
        //         : message.sender;
        
        //     state.individualList = state.individualList.filter(
        //         chat => chat._id !== otherUser._id
        //     );
        
        //     state.individualList.unshift({
        //         _id: otherUser._id,
        //         username: otherUser.username,
        //         name: otherUser.name,
        //         profilePicture: otherUser.profilePicture,
        //         lastMessageTime: message.timestamp,
        //         lastMessage: message.message
        //     });
        // },
        updateRecentIndividualChatList: (state, action) => {
            const { message, currentUserId } = action.payload;
        
            const otherUser = message.sender._id === currentUserId 
                ? message.recipient 
                : message.sender;
        
            const index = state.individualList.findIndex(chat => chat._id === otherUser._id);
        
            if (index !== -1) {
                const [chat] = state.individualList.splice(index, 1);
                chat.lastMessage = message.message;
                chat.lastMessageTime = message.timestamp;
                state.individualList.unshift(chat);
            } else {
                state.individualList.unshift({
                    _id: otherUser._id,
                    username: otherUser.username,
                    name: otherUser.name,
                    profilePicture: otherUser.profilePicture,
                    lastMessage: message.message,
                    lastMessageTime: message.timestamp
                });
            }
        },

        updateRecentGroupChatList: (state, action) => {
            const message = action.payload;
            const index = state.groupList.findIndex(group => group._id === message.groupId);
        
            if (index !== -1) {
                const [group] = state.groupList.splice(index, 1);
                group.lastMessage = message.message;
                group.lastMessageTime = message.timestamp;
        
                state.groupList.unshift(group);
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
    setGroupList, 
    addGroupList, 
    setIndividualList, 
    updateRecentIndividualChatList,
    updateRecentGroupChatList, 
    setSelectedChatData, 
    setSelectedChatMessages,
    addMessage, 
    setReceivedMessage,
    closeChat, 
    recentUsersList 
} = chatSlice.actions;

export default chatSlice.reducer;