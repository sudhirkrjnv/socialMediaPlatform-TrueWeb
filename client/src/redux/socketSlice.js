import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket: null,
        onlineUsers: [],
        typingUser: null,
    },
    reducers:{
        //actions
        setSocket:(state, action)=>{
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setTypingUser:(state, action)=>{
            state.typingUser = action.payload;
        },
    }
})

export const {setSocket, setOnlineUsers, setTypingUser} = socketSlice.actions;
export default socketSlice.reducer;