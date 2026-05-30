import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icono } from "./Icono";
import { MenuHamburguesa } from "./MenuHamburguesa";


export const Cabecera = ({sinLeer=false, cambiarMostrarAviso=null}) => {
    const {rol, user}=useSelector((state)=>state.auth);
    const {actual}=useSelector((state)=>state.comunidad);
    const navigate=useNavigate();

  return (
    <>
        <div className="relative w-screen flex justify-between items-center p-3 md:p-5 bg-linear-to-t from-transparent to-blue-900/80 z-50">
            <h1 className="font-retro text-3xl md:text-6xl text-blue-900 cursor-pointer" onClick={()=>navigate('/menu')}>MiComunidapp</h1>
            <div className="flex flex-row items-center gap-2">
                <p className="font-bold text-blue-900 text-2xl hidden sm:block">{actual?.nombre}</p>
                <div onClick={()=>navigate('/inicio')} className="text-blue-900 font-text font-semibold m-5 text-center box-border hover:cursor-pointer sm:flex flex-col hidden">
                    <p>{user.nombre}</p>
                    <p>{rol}</p>
                </div>                          
                <MenuHamburguesa/>
            </div>
        </div>        
    </>
  )
}