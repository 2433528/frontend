import { useDispatch, useSelector } from "react-redux"
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRefresh } from "../redux/thunks";
import { comunicadosSinLeer } from "../services/comunicados";
//import { suscribirNotificaciones } from "../services/notificacion";
import { Icono } from "../components/Icono";
import imagen from "../assets/CasaEnMano.png"
import { CabeceraSimple } from "../components/CabeceraSimple";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Plantilla2 } from "../components/Plantilla2";
import { Footer } from "../components/Footer";


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
            //suscribirNotificaciones();
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
        <Plantilla2>       
            <CabeceraSimple sinLeer={sinLeer} cambiarMostrarAviso={cambiarMostrarAviso}/>                  
                <div className="w-full md:w-8/12 mx-5 md:mx-10 z-30 px-10 md:px-30 relative">                
                    <section className="grid grid-cols-2 grid-rows-3 my-10 items-center gap-3 box-content">
                        <article onClick={()=>navigate('/comunicados')} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'campaign'} className="text-blue-900 icon-md"/>Comunicados</article>                    
                        <article onClick={()=>navigate('/convocatorias')} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'calendar_month'} className="text-blue-900 icon-md"/>Convocatorias</article>
                        <article onClick={()=>navigate('/actas')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'docs'} className="text-blue-900 icon-md"/>Actas</article>
                        <article onClick={()=>navigate('/incidencias')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'person_alert'} className="text-blue-900 icon-md"/>Incidencias</article>
                        <article onClick={()=>navigate('/tablon')} className="row-start-3 row-end-4 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'info'} className="text-blue-900 icon-md"/>Informacion</article>
                        {(rol === 'gestor') && <article onClick={()=>navigate('/menu-gestion')} className="row-start-3 row-end-4 bg-white ring-2 ring-blue-700 rounded-lg md:p-5 flex flex-col font-text font-bold items-center cursor-pointer"><Icono name={'add_home_work'} className="text-blue-900 icon-md"/>Comunidad</article>}
                    </section>                
                </div>                         
                   
            <img src={imagen} alt="" className="absolute bottom-1/12 right-0 hidden md:w-80 md:block lg:w-100 lg:block object-cover z-30" />
            <Footer/>      
        </Plantilla2>
    </>
  )
}
