import {createSlice} from '@reduxjs/toolkit'

const initialState={
    abierto:false
}

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        cambiarEstado: (state) => {
            state.abierto = !state.abierto;
        },

    }
});

export const {cambiarEstado}=menuSlice.actions;