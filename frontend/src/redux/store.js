import { configureStore } from '@reduxjs/toolkit'
import { auhtSlice } from './auhtSlice';
import { comunidadSlice } from './comunidadSlice';

export const store = configureStore({
    reducer:{
        auth:auhtSlice.reducer,
        comunidad:comunidadSlice.reducer,
    }
});
