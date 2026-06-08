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
    <div className="w-full flex flex-col my-5 items-center gap-3 box-content">
    { (avisoComunicado && rol !== 'gestor') &&
        <article onClick={()=>navigate('/comunicados')} className="flex items-center w-full ring-2 ring-blue-800 rounded-lg p-5 font-semibold hover:cursor-pointer">
            <Icono name={'mark_email_unread'} className="text-orange-400 animate-bounce mr-2"/>
            Comunicado
        </article>
    }
    { (avisos_list.some(aviso => aviso.tipo === 'convocatoria')) &&
        <article onClick={()=>navigate('/convocatorias')} className="flex items-center w-full ring-2 ring-blue-800 rounded-lg p-5 font-semibold hover:cursor-pointer">
            <Icono name={'event'} className="text-orange-400 animate-bounce mr-2"/>
            Convocatoria
        </article>
    }
    {  (avisos_list.some(aviso => aviso.tipo === 'acta')) &&
        <article onClick={()=>navigate('/actas')} className="flex items-center w-full ring-2 ring-blue-800 rounded-lg p-5 font-semibold hover:cursor-pointer">
            <Icono name={'thumbs_up_down'} className="text-orange-400 animate-bounce mr-2"/>
            Votación
        </article>
    }
    {   (avisos_list.some(aviso => aviso.tipo === 'incidencia') && rol === 'gestor') &&
        <article onClick={()=>navigate('/incidencias')} className="flex items-center w-full ring-2 ring-blue-800 rounded-lg p-5 font-semibold hover:cursor-pointer">
            <Icono name={'report'} className="text-orange-400 animate-bounce mr-2"/>
            Incidencia
        </article>
    }
    {  (avisos_list.some(aviso => aviso.tipo === 'info')) &&
        <article onClick={()=>navigate('/tablon')} className="flex items-center w-full ring-2 ring-blue-800 rounded-lg p-5 font-semibold hover:cursor-pointer">
            <Icono name={'help_clinic'} className="text-orange-400 animate-bounce mr-2"/>
            Información
        </article>
    }          
    </div>
  )
}
