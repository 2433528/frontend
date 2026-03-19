import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/thunks";
const API_URL = import.meta.env.VITE_API_URL;

export const useGetComunidad = () => {
    const [comunidades,setComunidades]=useState([]);

    const idUser=useSelector((state)=>state.auth.user.id)
    const dispatch=useDispatch();

    const getcomunidades=async()=>{
        try{
            const resp=await fetch(`${API_URL}/comunidades/?user=${idUser}`, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`,
                },
                credentials:'include'
            });
            
            if (resp.status === 404){
                dispatch(getRefresh());
            }else if (!resp.ok){                
                console.log(resp);
                return;
            }

            const data=await resp.json();
            setComunidades([
                ...comunidades,
                data
            ])        
        }
        catch(error){
            console.log(error);
        }
    }
    
    return {

    }
}
