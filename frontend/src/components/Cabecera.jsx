import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Icono } from "./Icono";
import { MenuHamburguesa } from "./MenuHamburguesa";
import { MenuPersonal } from "./MenuPersonal";
import { useEffect, useState } from "react";
import { getAvisos } from "../redux/thunksAvisos";


export const Cabecera = ({sinLeer=false, cambiarMostrarAviso=null}) => {
    const {rol, user, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {avisos_list, avisoComunicado}=useSelector((state)=>state.avisos);

    useEffect(()=>{        
      if (rol && is_authenticated && actual?.nombre){
          
          const conseguirAvisos=async()=>{
              await dispatch(getAvisos());
              return;
          }

          conseguirAvisos();    
      } 

      return;
    }, [rol, is_loading, is_authenticated, actual]);

  return (
    <>
        <div className="w-full flex justify-around sm:justify-end items-center h-24 bg-blue-900 z-50 p-2 sm:gap-10">
            <MenuHamburguesa/>
            {(avisos_list.length > 0 || (avisoComunicado && rol !== 'gestor'))? <Icono name={'notifications_unread'} className={`text-orange-400 hover:cursor-pointer`} onClick={()=>navigate('/inicio')}/>
            : <Icono name={'notifications'} className={`text-orange-400 hover:cursor-pointer`} onClick={()=>navigate('/inicio')}/>
            }                  
            <p className="bg-white font-bold text-blue-900 sm:text-2xl items-center flex shadow-inner shadow-blue-950 rounded-lg p-3"><Icono name={'home'}/>{actual?.nombre}</p>            
            <MenuPersonal/>
        </div>        
    </>
  )
}