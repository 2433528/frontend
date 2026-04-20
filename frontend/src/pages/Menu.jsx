import { useDispatch, useSelector } from "react-redux"
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRefresh } from "../redux/thunks";
import { comunicadosSinLeer } from "../services/comunicados";
import { suscribirNotificaciones } from "../services/notificacion";


export const Menu = () => {
    const {rol, is_authenticated, is_loading, token}=useSelector((state)=>state.auth);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [sinLeer, setSinLeer]=useState({sinLeer:false});

    const mostrarAviso=async()=>{
        const avisar=await comunicadosSinLeer(token, actual.id);
        if (!avisar?.sinLeer)return;
        setSinLeer(avisar);
    }

    useEffect(()=>{        
        if (rol && is_authenticated){
            suscribirNotificaciones();
            mostrarAviso();
        } 

        if (!is_loading && !is_authenticated){
            dispatch(getRefresh(navigate));
        }

        return;
    }, [rol, is_loading, is_authenticated]);

    const cambiarMostrarAviso=()=>{
        navigate('/comunicados');
        setSinLeer({sinLeer:false});
    }

  return (
    <>
        <div>
            {(sinLeer.sinLeer && rol !== 'gestor') && <p onClick={cambiarMostrarAviso}>✉️ Nuevo Comunicado.</p>}
            <div>
                <section>
                    <article onClick={()=>navigate('/comunicados')} style={{border: '2px solid black', margin: '1.5%'}}>Comunicados</article>
                    {(rol === 'gestor') && <article onClick={()=>navigate('/menu-gestion')} style={{border: '2px solid black' , margin: '1.5%'}}>Gestión Comunidad</article>}
                    <article onClick={()=>navigate('/convocatorias')} style={{border: '2px solid black', margin: '1.5%'}}>Convocatorias</article>
                    <article onClick={()=>navigate('/actas')} style={{border: '2px solid black', margin: '1.5%'}}>Actas</article>
                    <article onClick={()=>navigate('/incidencias')} style={{border: '2px solid black', margin: '1.5%'}}>Incidencias</article>
                    <article onClick={()=>navigate('/tablon')} style={{border: '2px solid black', margin: '1.5%'}}>Informacion</article>
                </section>
            </div>
            <BtnSalir/>
        </div>
    
    </>
  )
}
