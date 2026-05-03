import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuHamburguesa } from "./MenuHamburguesa";


export const Cabecera = () => {
    const {rol}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

  return (
    <>
        <div className="relative min-w-screen flex justify-between items-center p-3 md:p-5 bg-linear-to-b from-blue-400 to-blue-900 shadow-lg/100 shadow-blue-900 z-50">            
            <h1 className="font-retro text-3xl md:text-6xl text-white font-bold cursor-pointer" onClick={()=>navigate('/menu')}>MiComunidapp</h1>
            <div className="flex flex-row items-center gap-2">                
                <MenuHamburguesa/>
            </div>
        </div>
    </>
  )
}
