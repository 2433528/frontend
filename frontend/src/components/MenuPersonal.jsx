import { useState } from "react"
import { Icono } from "./Icono";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnSalir } from "./BtnSalir";
import { cambiarEstadoPersonal } from "../redux/menuSlice";

export const MenuPersonal = () => {
    const {rol, user}=useSelector((state)=>state.auth);
    const {personal}=useSelector((state)=>state.menu);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();

  return (
    <>
        <div onClick={()=>dispatch(cambiarEstadoPersonal())} className="flex">
            <div className="text-white font-text font-semibold pr-3 box-border hover:cursor-pointer flex flex-col items-center">
                <Icono name={'person'} className="cursor-pointer text-white"/>
                <p className="text-[0.8rem] sm:text-2xl">{rol.charAt(0).toUpperCase() + rol.slice(1).toLowerCase()}</p>
            </div> 

            <div className={`absolute sm:w-1/3 shadow-lg z-80 rounded-lg bg-white font-text
                overflow-hidden transition-all duration-700 ease-in-out ${personal? 'top-24 right-0':'top-24 right-[-300%]'}`}
            >
                <div onClick={()=>navigate('/inicio')} className="text-blue-900 font-text font-semibold m-5 text-center text-2xl box-border hover:cursor-pointer flex flex-col">
                    <p className="hover:text-blue-600">{user?.nombre}</p>
                    <p className="hover:text-blue-600">{rol.charAt(0).toUpperCase() + rol.slice(1).toLowerCase()}</p>
                    <hr className="text-blue-900 border-2 mt-5"/>
                </div>
                <ul className="p-10 box-border">
                    <li onClick={()=>navigate(`/modificar-usuario/?user_dni=${user?.dni}`)} className="flex font-bold items-center mb-3 hover:text-blue-600 hover:cursor-pointer"><Icono name={'person'} className="text-blue-900 mr-2"/>Mi información</li>
                    <li onClick={()=>navigate('/cambio-password')} className="flex font-bold items-center mb-3 hover:text-blue-600 hover:cursor-pointer"><Icono name={'password'} className="text-blue-900 mr-2"/>Cambiar mi contraseña</li>
                </ul>
                <p className="flex justify-center bg-linear-to-bl from-blue-500 to-blue-900 rounded-b-lg col-start-1 col-end-3"><BtnSalir addStyle={"w-full justify-center hover:rounded-none"}/></p>          
            </div>
            
        </div>
    </>
  )
}
