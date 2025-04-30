import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket: null,
        onlineUsers: [],
        typingData: null,
    },
    reducers:{
        //actions
        setSocket:(state, action)=>{
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setTypingData: (state, action) => {
            state.typingData = action.payload;
        },
    }
})

export const {setSocket, setOnlineUsers, setTypingData} = socketSlice.actions;
export default socketSlice.reducer;