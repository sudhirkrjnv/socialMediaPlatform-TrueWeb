import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket: null,
        userStatus: {},
        typingUser: null,
    },
    reducers:{
        //actions
        setSocket:(state, action)=>{
            state.socket = action.payload;
        },
        setUserStatus: (state, action) => {
            const { userId, status } = action.payload;
            state.userStatus[userId] = status;
        },
        setTypingUser:(state, action)=>{
            state.typingUser = action.payload;
        },
    }
})

export const {setSocket, setUserStatus, setTypingUser} = socketSlice.actions;
export default socketSlice.reducer;