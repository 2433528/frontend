import { useState } from "react"
import { Icono } from "./Icono";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnSalir } from "./BtnSalir";
import casa from '../assets/Casa.png';


export const MenuHamburguesaSimple = () => {
    const {rol, user}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [abierto, setAbierto]=useState(false);

    const mostrarMenu=()=>{
        setAbierto(!abierto);
    }

  return (
    <>
        <div onClick={mostrarMenu} className="flex flex-col">
        {abierto? <Icono name={'close'} className="cursor-pointer text-white self-end pr-5"/>:<Icono name={'menu'} className="cursor-pointer text-white self-end pr-1"/>}
        
        <div className="absolute top-full right-0 md:w-1/3 shadow-lg z-80 rounded-b-lg grid grid-cols-2 bg-[url(./assets/FondoPaisaje.png)] bg-cover font-text" hidden={!abierto}>
            <h2 onClick={()=>navigate('/inicio')} className="font-text font-bold md:text-3xl text-blue-900 my-10 flex items-center ml-5 cursor-pointer hover:text-blue-500"><Icono name={'person'} className="text-blue-900 mr-2"/>{user?.nombre} {rol}</h2>
            <img src={casa} alt="" className="absolute col-start-2 place-self-center mt-auto p-25"/>
            <p className="flex justify-center bg-linear-to-bl from-blue-500 to-blue-900 rounded-b-lg col-start-1 col-end-3"><BtnSalir/></p>          
        </div>
        
    </div>
    </>
  )
}