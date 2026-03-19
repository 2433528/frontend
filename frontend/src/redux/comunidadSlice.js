import { createSlice } from '@reduxjs/toolkit'

const initialState={
    comunidad_list:[]
}

export const comunidadSlice = createSlice({
    name:'comunidad',
    initialState,
    reducers:{
        obtenerComunidad:(state, {payload})=>{
            state.comunidad_list=payload;
        }
    }
});


export const {obtenerComunidad}=comunidadSlice.actions;