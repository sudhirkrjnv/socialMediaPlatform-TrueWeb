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
        setIndividualList: (state, action) => {
            state.individualList = action.payload;
        },
        setGroupList: (state, action) => {
            state.groupList = action.payload;
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
    closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;