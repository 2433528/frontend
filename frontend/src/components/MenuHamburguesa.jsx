import { useState } from "react"
import { Icono } from "./Icono";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnSalir } from "./BtnSalir";
import { cambiarEstado } from "../redux/menuSlice";
import { Sidebar } from "./Sidebar";


export const MenuHamburguesa = () => {
    const {rol, user}=useSelector((state)=>state.auth);
    const {abierto}=useSelector((state)=>state.menu);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();

  return (
    <>
        <div onClick={()=>dispatch(cambiarEstado({estado:true}))} className="flex flex-col sm:hidden">
            <Icono name={'menu'} className="cursor-pointer text-white self-end pr-1 ocultar"/>
            
            <div className={`absolute max-w-full h-full z-50 overflow-x-hidden 
            transition-all duration-700 ease-in-out ${abierto? 'top-0 left-0':'top-0 left-[-200%]'}`}
            >
                <Sidebar/>          
            </div>
            
        </div>
    </>
  )
}
