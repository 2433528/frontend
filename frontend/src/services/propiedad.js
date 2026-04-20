const API_URL = import.meta.env.VITE_API_URL;

export const createPropiedad =async (token='', datos={}) => {
  try{
        console.log(datos);
        const resp=await fetch(`${API_URL}/propiedades/`, {
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
            alert('Esta propiedad ya existe.')
            return false;
        }

        alert('Propiedad creada.')
    }
    catch(error){
        console.log(error);
    }    
}

export const getPropiedades =async (token='', num_piso='') => {
  try{
        const resp=await fetch(`${API_URL}/propiedades/?comunidad=${localStorage.getItem('actual')}&num_piso=${num_piso}`, {
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

export const getProp =async (token='', id) => {
  try{
        const resp=await fetch(`${API_URL}/propiedades/${id}/`, {
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

export const modificarPropiedad =async (id='', token='', form={}) => {
  try{
        const resp=await fetch(`${API_URL}/propiedades/${id}/`, {
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

        alert('Propiedad modificada.')
    }
    catch(error){
        console.log(error);
    }    
}


export const BorrarPropiedad =async (token='', id='') => {
  try{
        const resp=await fetch(`${API_URL}/propiedades/${id}/`, {
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

        alert('Propiedad borrada con exito.');
    }
    catch(error){
        console.log(error);
    }    
}