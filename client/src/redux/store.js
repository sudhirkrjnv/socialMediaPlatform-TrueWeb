import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer = combineReducers({
    auth:authSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
})

// const store = configureStore({
//     reducer: {
//         auth: authSlice
//     }
// })

export default store;