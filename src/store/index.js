import {configureStore} from '@reduxjs/toolkit';
import Ships from './apps/Ships';
export const store = configureStore({
    reducer:{
        Ships
    }, 
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    })
})