import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRefresh } from "../redux/thunks";
import { comunicadosSinLeer } from "../services/comunicados";
//import { suscribirNotificaciones } from "../services/notificacion";
import { getAvisos } from "../redux/thunksAvisos";
import { Icono } from "../components/Icono";
import { Avisos } from "../components/Avisos";


export const Menu = () => {
    const {rol, is_authenticated, is_loading, token}=useSelector((state)=>state.auth);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    

    // useEffect(()=>{        
    //     if (rol && is_authenticated && actual?.nombre){
    //         //suscribirNotificaciones();
    //         const conseguirAvisos=async()=>{
    //             await dispatch(getAvisos());                
    //             return;
    //         }

    //         conseguirAvisos();    
    //     } 

    //     return;
    // }, [rol, is_loading, is_authenticated, actual]);

  return (
    <>        
        <div className="max-w-full mx-5 md:mx-10 z-30 px-10 md:px-30 relative">
              
            <section className="flex flex-col my-5 items-center gap-3 box-content">
                {/* <article onClick={()=>navigate('/comunicados')} className="row-start-1 row-end-2 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'campaign'} className="text-blue-900 icon-md"/>Comunicados</article>                    
                <article onClick={()=>navigate('/convocatorias')} className="row-start-1 row-end-2 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'calendar_month'} className="text-blue-900 icon-md"/>Convocatorias</article>
                <article onClick={()=>navigate('/actas')} className="row-start-2 row-end-3 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'docs'} className="text-blue-900 icon-md"/>Actas</article>
                <article onClick={()=>navigate('/incidencias')} className="row-start-2 row-end-3 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'person_alert'} className="text-blue-900 icon-md"/>Incidencias</article>
                <article onClick={()=>navigate('/tablon')} className="row-start-3 row-end-4 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'info'} className="text-blue-900 icon-md"/>Información</article>
                {(rol === 'gestor') && <article onClick={()=>navigate('/menu-gestion')} className="row-start-3 row-end-4 bg-white hover:bg-blue-100 ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'add_home_work'} className="text-blue-900 icon-md"/>Comunidad</article>} */}
                <Avisos/>
            </section>                
        </div>        
                                              
    </>
  )
}
