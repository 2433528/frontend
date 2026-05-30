import { actualizarAvisos } from "./avisosSlice";


const API_URL = import.meta.env.VITE_API_URL;

export const getAvisos=()=>{
    return async(dispatch, getState)=>{
        const comunidad=getState().comunidad.actual.id
        try{
        const resp=await fetch(`${API_URL}/avisos/?comunidad=${comunidad}`, {
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
        dispatch(actualizarAvisos(data));
        return;
        }
        catch(error){
            console.log(error);
            return;
        }
    }
}


// export const crearAvisos=(tipo)=>{
//     return async(dispatch, getState)=>{
//         const comunidad=getState().comunidad.actual.id
//         try{
//         const resp=await fetch(`${API_URL}/avisos/`, {
//             method:'POST',
//             headers: {
//                 'Content-Type':'application/json',
//                 'Authorization': `Bearer ${getState().auth.token}`,
//             },
//             body:JSON.stringify({'comunidad':comunidad, tipo}),
//             credentials:'include'
//         });
        

//         if (!resp.ok){ 
//             const error=await resp.json();               
//             console.log(error);
//             return;
//         }

//         const data=await resp.json();
//         console.log(data);
//         return;
//         }
//         catch(error){
//             console.log(error);
//             return;
//         }
//     }
// }


export const marcarAviso=(id)=>{
    return async(dispatch, getState)=>{
        const comunidad=getState().comunidad.id
        try{
        const resp=await fetch(`${API_URL}/avisos/${id}/visto/`, {
            method:'PATCH',
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
        console.log(data);
        return;
        }
        catch(error){
            console.log(error);
            return;
        }
    }
}