const API_URL = import.meta.env.VITE_API_URL;
export const getConvocatorias=async(comunidad='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/convocatorias/?comunidad=${comunidad.id}`, {
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

export const getConvocatoria=async(id='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/convocatorias/${id}/`, {
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

export const nuevaConvocatoria=async(token='', datos={})=>{
    try{
        const resp=await fetch(`${API_URL}/convocatorias/`, {
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
            return;
        }

        alert('Convocatoria creada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}

export const changeConvocatoria=async(token='', id='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/convocatorias/${id}/`, {
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

export const delPunto=async(token='', id='')=>{

    try{
        const resp=await fetch(`${API_URL}/puntos/${id}/`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials:'include'
        });
        
        if (!resp.ok){                
            const error=await resp.json();               
            console.log(error);
            return;
        }

        alert('Punto borrado con exito.');
    }
    catch(error){
        console.log(error);
    }    
}
