import { useState } from "react"
import { Icono } from "./Icono";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnSalir } from "./BtnSalir";
import casa from '../assets/Casa.png';
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
            
            <div className="absolute top-full right-0 md:w-1/3 shadow-lg z-80 rounded-b-lg grid grid-cols-2 bg-[url(./assets/FondoPaisaje.png)] bg-cover font-text" hidden={!abierto}>
                <h2 onClick={()=>navigate('/inicio')} className="font-bold md:text-3xl text-blue-900 my-3 md:my-10 flex items-center ml-5 cursor-pointer hover:text-blue-500"><Icono name={'person'} className="text-blue-900 !text-5xl mr-2"/>{user?.nombre} {rol}</h2>
                <img src={casa} alt="" className="absolute col-start-2 place-self-center bottom-3"/>
                <ul className="col-end-2 ml-10">
                    <li onClick={()=>navigate('/comunicados')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg"><Icono name={'campaign'} className="text-blue-900 mr-2"/>Comunicados</li>                    
                    <li onClick={()=>navigate('/convocatorias')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg"><Icono name={'calendar_month'} className="text-blue-900 mr-2"/>Convocatorias</li>
                    <li onClick={()=>navigate('/actas')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg"><Icono name={'docs'} className="text-blue-900 mr-2"/>Actas</li>
                    <li onClick={()=>navigate('/incidencias')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg"><Icono name={'person_alert'} className="text-blue-900 mr-2"/>Incidencias</li>
                    <li onClick={()=>navigate('/tablon')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg"><Icono name={'info'} className="text-blue-900 mr-2"/>Informacion</li>
                    {(rol === 'gestor') && <li onClick={()=>navigate('/menu-gestion')} className="p-2 md:p-5 flex font-bold items-center hover:border-2 hover:border-blue-900 hover:rounded-lg font-text mb-2"><Icono name={'add_home_work'} className="text-blue-900 mr-2"/>Gestión Comunidad</li>}                
                </ul>
                <p className="flex justify-center bg-linear-to-bl from-blue-500 to-blue-900 rounded-b-lg col-start-1 col-end-3"><BtnSalir/></p>          
            </div>
            
        </div>
    </>
  )
}
