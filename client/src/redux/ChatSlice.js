import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: [],
        recentChatList:[],
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
        setRecentChatList: (state, action) => {
            state.recentChatList = action.payload;
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
        closeChat: (state) => {
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = [];
        },
    },
});

export const { setSelectedChatType, setSelectedChatData, setSelectedChatMessages, addMessage, setReceivedMessage, setRecentChatList, closeChat } = chatSlice.actions;
export default chatSlice.reducer;