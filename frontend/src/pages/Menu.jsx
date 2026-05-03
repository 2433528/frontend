import { useDispatch, useSelector } from "react-redux"
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRefresh } from "../redux/thunks";
import { comunicadosSinLeer } from "../services/comunicados";
import { suscribirNotificaciones } from "../services/notificacion";
import { Icono } from "../components/Icono";
import imagen from "../assets/CasaEnMano.png"
import { CabeceraSimple } from "../components/CabeceraSimple";


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
        <div className="bg-linear-to-tl from-blue-400 to-blue-900 h-screen w-screen flex flex-col items-center relative overflow-hidden">
            <CabeceraSimple sinLeer={sinLeer} cambiarMostrarAviso={cambiarMostrarAviso}/>
            <div className="relative flex w-full h-full">
                <div className="bg-[url(./assets/AcuarelaCasitas.png)] bg-cover w-1/5 opacity-20"></div>                
                <div className="w-full mx-5 md:mx-10">
                    <section className="grid grid-cols-2 grid-rows-3 my-10 items-center gap-3 box-content">
                        <article onClick={()=>navigate('/comunicados')} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'campaign'} className="text-blue-900 icon-md"/>Comunicados</article>                    
                        <article onClick={()=>navigate('/convocatorias')} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'calendar_month'} className="text-blue-900 icon-md"/>Convocatorias</article>
                        <article onClick={()=>navigate('/actas')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'docs'} className="text-blue-900 icon-md"/>Actas</article>
                        <article onClick={()=>navigate('/incidencias')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'person_alert'} className="text-blue-900 icon-md"/>Incidencias</article>
                        <article onClick={()=>navigate('/tablon')} className="row-start-3 row-end-4 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'info'} className="text-blue-900 icon-md"/>Informacion</article>
                        {(rol === 'gestor') && <article onClick={()=>navigate('/menu-gestion')} className="row-start-3 row-end-4 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'add_home_work'} className="text-blue-900 icon-md"/>Comunidad</article>}
                    </section>                
                </div>                         
            </div>        
            <img src={imagen} alt="" className="absolute bottom-0 right-0 hidden md:w-80 md:block lg:w-100 lg:block object-cover" />
        </div>
    
    </>
  )
}
