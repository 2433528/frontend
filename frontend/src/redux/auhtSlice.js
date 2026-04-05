import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:{},
    is_authenticated:false,
    token:'',
    roles_list:[],
    rol:'',
}

export const auhtSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, {payload})=>{
            state.user=payload.user;
            state.is_authenticated=true;
            state.token=payload.access;
        },

        refresh:(state, {payload})=>{
            state.token=payload.access;
        },

        logout:(state)=>{
            state.user={};
            state.is_authenticated=false;
            state.token='';
        },

        roles:(state, {payload})=>{
            state.roles_list=payload;
        },

        asignarRol:(state, {payload})=>{
            state.rol=payload.rol;
        },
    }
});

export const {login, refresh,logout, roles, asignarRol}=auhtSlice.actions;