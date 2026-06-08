import { createSlice } from "@reduxjs/toolkit"

export const avisosSlice=createSlice({
    name:'avisos',
    initialState:{avisos_list:[], avisoComunicado:false},
    reducers:{
        actualizarAvisos:(state, {payload})=>{
            state.avisos_list=payload;
        },

        actualizarAvisoComunicado:(state, {payload})=>{
            state.avisoComunicado=payload.estado;
        },

        resetAvisos:(state)=>{
            state.avisos_list=[];
            state.avisoComunicado=false;
        },
    }
});

export const{actualizarAvisos, actualizarAvisoComunicado, resetAvisos}=avisosSlice.actions;