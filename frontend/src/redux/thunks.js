import { useNavigate } from "react-router-dom";
import { login, logout, refresh } from "./auhtSlice";
const API_URL = import.meta.env.VITE_API_URL;

export const getToken=(username, password, navigate='')=>{
    return async(dispatch)=>{
        try{
            const response=await fetch(`${API_URL}/login/`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({username, password})
            });

            if (!response.ok){                
                console.log('Credenciales incorrentas', response);
                alert('Credenciales incorrentas')
                return;
            } 

            const data1=await response.json();

            const resp=await fetch(`${API_URL}/getuser/`, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${data1.access}`,
                },
                credentials:'include'
            });

            if (!resp.ok){                
                console.log('No se consiguió el usuario.', resp);
                alert('No se consiguió el usuario.')
                return;
            }

            const data2=await resp.json();

            dispatch(login({access:data1.access, user:data2}))
            console.log('Login exitoso');
            (navigate !== '') && navigate('/inicio');
       }
       catch(error){
            alert('Usuario no reconocido');
            console.log(error);            
       }
    }
}

export const getRefresh=()=>{
    return async(dispatch, getState)=>{
        try{
            const resp=await fetch(`${API_URL}/refresh/`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`,
                },
                credentials:'include'
            });

            if (!resp.ok){                
                console.log(resp);
                dispatch(getLogout());
            }

            const data=await resp.json();
            dispatch(refresh(data.access))
            console.log('Refresh exitoso');
       }
       catch(error){
            console.log(error);
       }
    }
}

export const getLogout=(navigate='')=>{
    return async(dispatch, getState)=>{
        try{
            const resp=await fetch(`${API_URL}/logout/`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`,
                },
                credentials:'include'
            });

            if (!resp.ok){                
                console.log(resp);
                (navigate !== '') && navigate('/');
                return;
            }

            const data=await resp.json();
            dispatch(logout());
            console.log(data);
            navigate('/');      
       }
       catch(error){
            console.log(error);
       }
    }
}