const API_URL = import.meta.env.VITE_API_URL;

export const createUser =async (token='', datos={}) => {
  try{
        const resp=await fetch(`${API_URL}/usuarios/`, {
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
            return data;
        }

        alert('Propietario creado.')
    }
    catch(error){
        console.log(error);
    }    
}

export const getPropietarios =async (token='') => {
  try{
        const resp=await fetch(`${API_URL}/usuarios/?comunidad=${localStorage.getItem('actual')}`, {
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

export const getUsu =async (token='', dni='') => {
  try{
        const resp=await fetch(`${API_URL}/usuarios/?comunidad=${localStorage.getItem('actual')}&dni=${dni}`, {
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

export const modificarUser =async (id='', token='', form={}) => {
  try{
        const resp=await fetch(`${API_URL}/usuarios/${id}/`, {
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

        alert('Propietario modificado.')
    }
    catch(error){
        console.log(error);
    }    
}


export const BorrarUser =async (token='', id='') => {
  try{
        const resp=await fetch(`${API_URL}/usuarios/${id}/`, {
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

        alert('Propietario borrado con exito.');
    }
    catch(error){
        console.log(error);
    }    
}


export const getAsistentes =async (token='') => {
  try{
        const resp=await fetch(`${API_URL}/usuarios-asistencia/?comunidad=${localStorage.getItem('actual')}`, {
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


export const getPresentes =async (token='', acta_id) => {
  try{
        const resp=await fetch(`${API_URL}/asistencia/?comunidad=${localStorage.getItem('actual')}&acta_id=${acta_id}`, {
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