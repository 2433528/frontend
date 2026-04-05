const API_URL = import.meta.env.VITE_API_URL;
export const getInfo=async(comunidad='', token='')=>{

    try{
        const resp=await fetch(`${API_URL}/informaciones/?comunidad=${comunidad}`, {
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

export const sendInfo=async(token='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/informaciones/`, {
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

        alert('Información creada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}

export const delInfo=async(token='', id)=>{

    try{
        const resp=await fetch(`${API_URL}/informaciones/${id}/`, {
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

        alert('Información borrada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}