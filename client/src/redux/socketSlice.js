import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket: null,
        typingUser: null,
    },
    reducers:{
        //actions
        setSocket:(state, action)=>{
            state.socket = action.payload;
        },
        setTypingUser:(state, action)=>{
            state.typingUser = action.payload;
        },
    }
})

export const {setSocket, setUserStatus, setTypingUser} = socketSlice.actions;
export default socketSlice.reducer;