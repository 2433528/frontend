import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delInfo, getInfo } from "../services/info";
import { getRefresh } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { BtnMenu } from "../components/BtnMenu";


export const TablonInfo = () => {
    const {token, is_loading, rol, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [datos, setDatos]=useState([]);    

    useEffect(() => {
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
            return;
        }

        if (token && comunidad?.id && !is_loading) {
            const cargarDatos = async () => {
                const data = await getInfo(comunidad.id, token);
                
                if (!data) return; 
                setDatos(Array.isArray(data) ? data : []);
            };
            cargarDatos();
        }

        return;
    }, [token, comunidad?.id, is_loading]);

    const handleDelete=(id)=>{
        const info=datos.filter((inf)=>inf.id !== id);
        setDatos(info);
        delInfo(token, id);
    }

  return (
    <>
        <BtnMenu/>
        <h1>Tablón de anuncios</h1>
        <section>
            {(rol === 'gestor') && <button onClick={()=>navigate('/nuevo-info')}>Nuevo</button>}
            {
                datos.map((inf)=>(
                    <div key={inf.id}>
                        <h2>📌 {inf.titulo}</h2>
                        <p><strong>Fecha: </strong>{inf.fecha_creacion}</p>
                        <p><strong>Descripción: </strong>{inf.texto}</p>
                        {(rol === 'gestor') && <button onClick={()=>handleDelete(inf.id)}>Eliminar</button>}
                    </div>
                ))
            }
        </section>
    </>
  )
}
