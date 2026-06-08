import {createSlice} from '@reduxjs/toolkit'

const initialState={
    abierto:false,
    personal:false
}

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        cambiarEstado: (state, {payload}) => {
            state.abierto = payload.estado;
        },

        cambiarEstadoPersonal: (state) => {
            state.personal = !state.personal;
        },

    }
});

export const {cambiarEstado, cambiarEstadoPersonal}=menuSlice.actions;