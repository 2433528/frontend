import { replace } from "react-router-dom";
import { asignarRol, login, logout, refresh, roles, startLoading } from "./auhtSlice";
import { getComActual, getComunidades } from "./thunksComunidad";
const API_URL = import.meta.env.VITE_API_URL;

export const getToken=(username, password, navigate='')=>{
    return async(dispatch)=>{
        try{
            const response=await fetch(`${API_URL}/login/`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({username, password}),
                credentials:'include'
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

export const getRefresh=(navigate='')=>{
    return async(dispatch)=>{
        dispatch(startLoading());
        try{
            const resp1=await fetch(`${API_URL}/refresh/`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                credentials:'include'
            });

            if (!resp1.ok){   
                const error=await resp1.json();             
                console.log(error);
                dispatch(getLogout(navigate));
                return false;
            }

            const data1=await resp1.json();

            const resp2=await fetch(`${API_URL}/getuser/`, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${data1.access}`,
                },
                credentials:'include'
            });

            if (!resp2.ok){     
                dispatch(getLogout(navigate));           
                alert('No se consiguió el usuario.')
                return false;
            }

            const data2=await resp2.json();            
            await dispatch(login({access:data1.access, user:data2}))            
            await dispatch(getComActual(`${localStorage.getItem('actual')}`));
            await dispatch(getRol(data1.access, `${localStorage.getItem('actual')}`, data2.user_id));
            console.log('Refresh exitoso');
            return true;
       }
       catch(error){
            dispatch(getLogout(navigate));
            console.log(error);
            return false;
       }
    }
}

export const getLogout=(navigate='')=>{
    return async(dispatch, getState)=>{
        try {
            const token = getState().auth.token;
            
            if (token) {
                await fetch(`${API_URL}/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(logout());
            console.log('Sesión cerrada.')
            if (navigate !== '') navigate('/', { replace: true });
        }
    }
}


export const getRoles=()=>{
    return async(dispatch, getState)=>{
        try{
            const resp=await fetch(`${API_URL}/roles-comunidad/?user=${getState().auth.user.user_id}`, {
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
            return false;
        }

        const data=await resp.json();
        dispatch(roles(data));
        return;      
        }
        catch(error){
            console.log(error);
        }
    }
}

export const getRol=(token, comunidad, user)=>{
    return async(dispatch)=>{
        try{
            const resp=await fetch(`${API_URL}/roles-comunidad/?user=${user}&comunidad=${comunidad}`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials:'include'
        });
        

        if (!resp.ok){
            const error=await resp.json();               
            console.log(error);
            return false;
        }

        const data=await resp.json();
        const actual=data.find((item)=>item.rol === 'gestor') || null;
        (actual)? dispatch(asignarRol({rol:actual.rol})):dispatch(asignarRol({rol:data[0].rol}));
        return;      
        }
        catch(error){
            console.log(error);
        }
    }
}