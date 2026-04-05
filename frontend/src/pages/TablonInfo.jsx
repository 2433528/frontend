import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delInfo, getInfo } from "../services/info";
import { getRefresh } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { store } from "../redux/store";


export const TablonInfo = () => {
    const token=useSelector((state)=>state.auth.token);
    const user=useSelector((state)=>state.auth.user);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const [datos, setDatos]=useState([]);    

    const infoFetch = async () => {
        try {
            const data = await getInfo(comunidad.id, token);
            if (!data){   
                dispatch(getRefresh(navigate))                
                .then(async()=>{
                    const newToken = store.getState().auth.token;
                    const newComunidad = store.getState().comunidad.actual.id;                    
                    const data2=await getInfo(newComunidad, newToken);
                    setDatos(Array.isArray(data2)? data2:[]);
                    if (!data2){
                        return;
                    }
                });
                
                return;
            }
            setDatos(Array.isArray(data)? data:[]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete=(id)=>{
        const info=informacion.filter((inf)=>inf.id !== id);
        setDatos(info);
        delInfo(token, id);
    }

    useEffect(()=>{
        infoFetch();
    }, [comunidad.id]);

  return (
    <>
        <h1>Tablón de anuncios</h1>
        <section>
            {(user.rol === 'gestor') && <button onClick={()=>navigate('/nuevo-info')}>Nuevo</button>}
            {
                datos.map((inf)=>(
                    <div key={inf.id}>
                        <h2>📌 {inf.titulo}</h2>
                        <p><strong>Fecha: </strong>{inf.fecha_creacion}</p>
                        <p><strong>Descripción: </strong>{inf.texto}</p>
                        {(user.rol === 'gestor') && <button onClick={()=>handleDelete(inf.id)}>Eliminar</button>}
                    </div>
                ))
            }
        </section>
    </>
  )
}
