const API_URL = import.meta.env.VITE_API_URL;
export const getActas=async(comunidad='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/actas/?comunidad=${comunidad.id}`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials:'include'
        });

        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            return [];
        }

        const data=await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }    
}

export const getActa=async(id='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/actas/${id}/`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials:'include'
        });

        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            return {};
        }

        const data=await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
        return {};
    }    
}

export const nuevaActa=async(token='', datos={})=>{
    try{
        const resp=await fetch(`${API_URL}/actas/`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },            
            body:JSON.stringify(datos),
            credentials:'include'
        });
        

        if (!resp.ok){                
            const error=await resp.json();               
            console.log(error);
            alert('Ya existe un acta para esta convocatoria.')
            return;
        }

        alert('Acta creada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}

export const changeActa=async(token='', id='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/actas/${id}/`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(datos),
            credentials:'include'
        });
        
        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            alert('No se pudo hacer el cambio.')
            return null;
        }

        alert('Datos cambiados');
        return {};
    }
    catch(error){
        console.log(error);
    }    
}


export const saveAsistentes=async(token='', datos={})=>{
    try{
        const resp=await fetch(`${API_URL}/asistencia/`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },            
            body:JSON.stringify(datos),
            credentials:'include'
        });
        

        if (!resp.ok){                
            const error=await resp.json();               
            console.log(error);
            alert('No se guardaron los asistentes.')
            return null;
        }

        alert('Asistentes guardados con exito.');
        return{};
    }
    catch(error){
        console.log(error);
    }    
}