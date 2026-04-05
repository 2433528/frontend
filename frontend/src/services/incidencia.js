const API_URL = import.meta.env.VITE_API_URL;
export const getInci=async(comunidad='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/incidencias/?comunidad=${comunidad}`, {
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
            return false;
        }

        const data=await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
    }    
}

export const sendInci=async(token='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/incidencias/`, {
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

        alert('Incidencia creada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}

export const delInci=async(token='', id='')=>{

    try{
        const resp=await fetch(`${API_URL}/incidencias/${id}/`, {
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

        alert('Incidencia borrada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}


export const changeInci=async(token='', estado='', id)=>{

    try{
        const resp=await fetch(`${API_URL}/incicambiarestado/${id}/`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify({'estado':estado}),
            credentials:'include'
        });
        
        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            alert(data.estado);
            return;
        }

        const data=await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
    }    
}