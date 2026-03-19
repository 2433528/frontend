import { obtenerComunidad } from "./comunidadSlice";
import { getRefresh } from "./thunks";
const API_URL = import.meta.env.VITE_API_URL;

export const getComunidad=(user)=>{
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
            console.log(resp);
            dispatch(getRefresh());
        }

        const data=await resp.json();
        dispatch(obtenerComunidad(data));
        }
        catch(error){
            console.log(error);
        }
    }
}