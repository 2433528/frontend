import { useDispatch, useSelector } from "react-redux"
import { Icono } from "./Icono";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { comunicadosSinLeer } from "../services/comunicados";
import { actualizarAvisoComunicado } from "../redux/avisosSlice";

export const Avisos = (tipo=null) => {
    const {token, rol, is_authenticated}=useSelector((state)=>state.auth);
    const {avisos_list, avisoComunicado}=useSelector((state)=>state.avisos);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const mostrarAviso=async()=>{
        const avisar=await comunicadosSinLeer(token, actual.id);
        if (!avisar?.sinLeer)return;
        dispatch(actualizarAvisoComunicado({
            estado:true
        }));
    }

    useEffect(()=>{        
        if (rol && is_authenticated){
            mostrarAviso();
        }
        return;
    }, [rol, is_authenticated]);


    

  return (
    <div className="w-full flex justify-around sm:justify-end gap-2 sm:gap-15 px-5">
    { (avisoComunicado && rol !== 'gestor') &&
        <article onClick={()=>navigate('/comunicados')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer">
            <Icono name={'mark_email_unread'} className="text-orange-400 animate-bounce"/>
            Comunicado
        </article>
    }
    { (avisos_list.some(aviso => aviso.tipo === 'convocatoria')) &&
        <article onClick={()=>navigate('/convocatorias')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer">
            <Icono name={'event'} className="text-orange-400 animate-bounce"/>
            Convocatoria
        </article>
    }
    {  (avisos_list.some(aviso => aviso.tipo === 'acta')) &&
        <article onClick={()=>navigate('/actas')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer">
            <Icono name={'thumbs_up_down'} className="text-orange-400 animate-bounce"/>
            Votación
        </article>
    }
    {   (avisos_list.some(aviso => aviso.tipo === 'incidencia') && rol === 'gestor') &&
        <article onClick={()=>navigate('/incidencias')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer">
            <Icono name={'notifications_unread'} className="text-orange-400 animate-bounce"/>
            Incicencia
        </article>
    }
    {  (avisos_list.some(aviso => aviso.tipo === 'info')) &&
        <article onClick={()=>navigate('/tablon')} className="flex flex-col font-text font-bold items-center">
            <Icono name={'help_clinic'} className="text-orange-400 animate-bounce"/>
            Información
        </article>
    }          
    </div>
  )
}
