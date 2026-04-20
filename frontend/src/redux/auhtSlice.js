import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:{},
    is_authenticated:false,
    is_loading:false,
    token:'',
    roles_list:[],
    rol:'',
}

export const auhtSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        startLoading: (state) => {
            state.is_loading = true;
        },

        login:(state, {payload})=>{
            state.user=payload.user;
            state.is_authenticated=true;
            state.token=payload.access;
            state.is_loading = false;
        },

        refresh:(state, {payload})=>{
            state.token=payload.access;
            state.is_authenticated = true;
            state.is_loading = false;
        },

        logout:(state)=>{
            state.user={};
            state.is_authenticated=false;
            state.token='';
            state.is_loading = false;
        },

        roles:(state, {payload})=>{
            state.roles_list=payload;
        },

        asignarRol:(state, {payload})=>{
            state.rol=payload.rol;
        },
    }
});

export const {startLoading, login, refresh,logout, roles, asignarRol}=auhtSlice.actions;