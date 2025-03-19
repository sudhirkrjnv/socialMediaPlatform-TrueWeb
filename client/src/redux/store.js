import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authSlice from "./authSlice.js"
import postSlice from "./postSlice.js";
import chatSlice from "./chatSlice.js";
import socketSlice from "./socketSlice.js"

const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer = combineReducers({
    auth:authSlice,
    post:postSlice,
    chat: chatSlice,
    socket: socketSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

// const store = configureStore({
//     reducer: {
//         auth: authSlice
//     }
// })

export default store;