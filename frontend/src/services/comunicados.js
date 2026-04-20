const API_URL = import.meta.env.VITE_API_URL;
export const getcomunicados=async(comunidad='', token='', rol='')=>{
    try{
        const resp=await fetch(`${API_URL}/comunicados/?comunidad=${comunidad}&rol=${rol}`, {
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

export const changeLeido=async(token='', id)=>{

    try{
        const resp=await fetch(`${API_URL}/comunicadousuario/${id}/`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify({'leido':true}),
            credentials:'include'
        });
        
        if (!resp.ok){                
            const data = await resp.json();
            console.log("ERROR BACKEND:", data);
            alert(data.estado);
            return null;
        }

        const data=await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }    
}


export const sendComunicado=async(token='', datos={})=>{

    try{
        const resp=await fetch(`${API_URL}/comunicados/`, {
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
            alert('No se pudo crear el comunicado.')
            return null;
        }

        alert('Comunicado crado con exito.');
        return {};
    }
    catch(error){
        console.log(error);
        return null;
    }    
}


export const changeComunicado=async(token='', estado='', id)=>{

    try{
        const resp=await fetch(`${API_URL}/comunicados/${id}/`, {
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


export const comunicadosSinLeer=async(token='', comunidad='')=>{
    try{
        const resp=await fetch(`${API_URL}/sinleer/?comunidad=${comunidad}`, {
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


export const getususcomunicado=async(comunidad='', token='')=>{
    try{
        const resp=await fetch(`${API_URL}/usuarios_comunicado/?comunidad=${comunidad}`, {
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