import { createSlice } from '@reduxjs/toolkit'

const initialState={
    comunidad_list:[],
    actual:{}
}

export const comunidadSlice = createSlice({
    name:'comunidad',
    initialState,
    reducers:{
        obtenerComunidad:(state, {payload})=>{
            state.comunidad_list=payload;
        },

        obtenerActual:(state, {payload})=>{
            state.actual=payload;
        }
    }
});


export const {obtenerComunidad, obtenerActual}=comunidadSlice.actions;