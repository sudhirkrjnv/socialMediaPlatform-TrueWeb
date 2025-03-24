import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket: null,
        userStatus: {},
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
    }
})

export const {setSocket, setUserStatus} = socketSlice.actions;
export default socketSlice.reducer;