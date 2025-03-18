import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: [],
    },
    reducers: {

        setSelectedChatType: (state, action) => {
            state.selectedChatType = action.payload;
        },
  
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload;
        },
        
        addMessage: (state, action) => {
            const { message } = action.payload;
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

        closeChat: (state) => {
            state.selectedChatType = undefined;
            state.selectedChatData = undefined;
            state.selectedChatMessages = [];
        },
    },
});


export const { setSelectedChatType, setSelectedChatData, addMessage, closeChat } = chatSlice.actions;
export default chatSlice.reducer;