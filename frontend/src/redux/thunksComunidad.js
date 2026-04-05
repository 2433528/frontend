import { obtenerActual, obtenerComunidad } from "./comunidadSlice";
const API_URL = import.meta.env.VITE_API_URL;

export const getComunidades=(user)=>{
    return async(dispatch, getState)=>{
        try{
        const resp=await fetch(`${API_URL}/comunidades/?user=${user}`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${getState().auth.token}`,
            },
            credentials:'include'
        });
        

        if (!resp.ok){ 
            const error=await resp.json();               
            console.log(error);
            return;
        }

        const data=await resp.json();
        dispatch(obtenerComunidad(data));
        return data;
        }
        catch(error){
            console.log(error);
        }
    }
}

export const getComActual=(id='')=>{
    return async(dispatch, getState)=>{
        try{
        const resp=await fetch(`${API_URL}/comunidades/${id}/`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${getState().auth.token}`,
            },
            credentials:'include'
        });
        

        if (!resp.ok){ 
            const error=await resp.json();               
            console.log(error);
            return;
        }

        const data=await resp.json();
        dispatch(obtenerActual(data));        
        }
        catch(error){
            console.log(error);
        }
    }
}

