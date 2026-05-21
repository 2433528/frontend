
const API_URL = import.meta.env.VITE_API_URL;

export const createComunidad =async (token='', datos={}) => {
  try{
        const resp=await fetch(`${API_URL}/comunidades/`, {
            method:'POST',
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
            alert('Esta comunidad ya existe.')
            return false;
        }

        alert('Comunidad creada.')
    }
    catch(error){
        console.log(error);
    }    
}

export const todoComunidades =async (token='', cif='') => {
  try{
    const resp=await fetch(`${API_URL}/comunidades/?cif=${cif}`, {
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

    const data = await resp.json();
    return data;
    }
    catch(error){
        console.log(error);
        return [];
    }    
}

export const getCom =async (token='', id='') => {
  try{
        const resp=await fetch(`${API_URL}/comunidades/${id}/`, {
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

        const data = await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
        return {};
    }    
}

export const modificarComunidad =async (id='', token='', form={}) => {
  try{
        const resp=await fetch(`${API_URL}/comunidades/${id}/`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(form),
            credentials:'include'
        });
        

        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            return false;
        }

        alert('Comunidad modificada.')
    }
    catch(error){
        console.log(error);
    }    
}


export const BorrarComunidad =async (token='', id='') => {
  try{
        const resp=await fetch(`${API_URL}/comunidades/${id}/`, {
            method:'DELETE',
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

        alert('Comunidad borrada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}