import { useState } from "react"
import { Icono } from "./Icono";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnSalir } from "./BtnSalir";
import { cambiarEstado } from "../redux/menuSlice";


export const MenuHamburguesa = () => {
    const {rol, user}=useSelector((state)=>state.auth);
    const {abierto}=useSelector((state)=>state.menu);
    const navigate=useNavigate();
    const dispatch=useDispatch();

  return (
    <>
        <div onClick={()=>dispatch(cambiarEstado())} className="flex flex-col">
            {abierto? <Icono name={'close'} className="cursor-pointer text-white self-end pr-5"/>:<Icono name={'menu'} className="cursor-pointer text-white self-end pr-1"/>}
            
            <div className={`absolute md:w-1/3 shadow-lg z-80 rounded-lg bg-white font-text
                overflow-hidden transition-all duration-700 ease-in-out ${abierto? 'top-full right-0':'top-full right-[-300%]'}`}
            >
                <div onClick={()=>navigate('/inicio')} className="text-blue-900 font-text font-semibold m-5 text-center text-2xl box-border hover:cursor-pointer flex flex-col">
                    <p>{user.nombre}</p>
                    <p>{rol}</p>
                </div>
                <ul className="p-10 box-border">
                    <li onClick={()=>navigate('/comunicados')} className="flex font-bold items-center mb-3 border-b border-dotted border-blue-900 hover:text-blue-600"><Icono name={'campaign'} className="text-blue-900 mr-2"/>Comunicados</li>                    
                    <li onClick={()=>navigate('/convocatorias')} className="flex font-bold items-center mb-3 border-b border-dotted border-blue-900 hover:text-blue-600"><Icono name={'calendar_month'} className="text-blue-900 mr-2"/>Convocatorias</li>
                    <li onClick={()=>navigate('/actas')} className="flex font-bold items-center mb-3 border-b border-dotted border-blue-900 hover:text-blue-600"><Icono name={'docs'} className="text-blue-900 mr-2"/>Actas</li>
                    <li onClick={()=>navigate('/incidencias')} className="flex font-bold items-center mb-3 border-b border-dotted border-blue-900 hover:text-blue-600"><Icono name={'person_alert'} className="text-blue-900 mr-2"/>Incidencias</li>
                    <li onClick={()=>navigate('/tablon')} className="flex font-bold items-center mb-3 border-b border-dotted border-blue-900 hover:text-blue-600"><Icono name={'info'} className="text-blue-900 mr-2"/>Informacion</li>
                    {(rol === 'gestor') && <li onClick={()=>navigate('/menu-gestion')} className="flex font-bold items-center hover:text-blue-600 font-text mb-2"><Icono name={'add_home_work'} className="text-blue-900 mr-2"/>Gestión Comunidad</li>}                
                </ul>
                <p className="flex justify-center bg-linear-to-bl from-blue-500 to-blue-900 rounded-b-lg col-start-1 col-end-3"><BtnSalir/></p>          
            </div>
            
        </div>
    </>
  )
}
