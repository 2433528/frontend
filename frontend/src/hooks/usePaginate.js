
export const usePaginate = (previous='', next='', token='', actualizarEstado) => {

    const getPrevious=async()=>{
        try{
            const resp=await fetch(previous, {
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
            actualizarEstado(data);
            return;
        }
        catch(error){
            console.log(error);
        } 
    }

    const getNext=async()=>{
        try{
            const resp=await fetch(next, {
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
            actualizarEstado(data);
            return;
        }
        catch(error){
            console.log(error);
        } 
    }

  return {
    getPrevious,
    getNext
  }
}
