const API_URL = import.meta.env.VITE_API_URL;
export const votaciones=async(comunidad='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/votaciones/?comunidad=${comunidad.id}`, {
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

export const getVotacion=async(id='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/votaciones/${id}/`, {
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

export const nuevaVotacion=async(token='', id='')=>{
    try{
        const resp=await fetch(`${API_URL}/votaciones/?id_punto=${id}`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },            
            credentials:'include'
        });
        
        if (resp.status === 401) {
            console.log("Token expirado");
            return null;
        }

        if (!resp.ok){                
            const error=await resp.json();               
            console.log(error);
            return null;
        }

        alert('Votacion creada con exito.');
        return {};
    }
    catch(error){
        console.log(error);
    }    
}

export const changeVotacion=async(token='', id='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/votaciones/${id}/`, {
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


export const nuevoVoto=async(token='', datos={})=>{
    try{
        const resp=await fetch(`${API_URL}/votos/`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(datos),    
            credentials:'include'
        });
        
        if (resp.status === 401) {
            console.log("Token expirado");
            return null;
        }

        if (!resp.ok){                
            const error=await resp.json();               
            console.log(error);
            alert('No se pudo hacer el voto.')
            return null;
        }

        alert('Voto creado con exito.');
        return {};
    }
    catch(error){
        console.log(error);
        alert('Esta opción ya está votada.');
        return {};
    }    
}
