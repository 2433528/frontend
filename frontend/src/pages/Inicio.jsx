import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComActual} from "../redux/thunksComunidad";
import { BtnSalir } from "../components/BtnSalir";
import { useLocation, useNavigate } from "react-router-dom";
import { getRefresh, getRoles} from "../redux/thunks";
import { ComunidadesList } from "../components/ComunidadesList";
import { Checked } from "../components/Checked";
import { Footer } from "../components/Footer";
import { Icono } from "../components/Icono";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import imagen from "../assets/CasaEnMano.png"
import { Menu } from "./Menu";
import { MenuHamburguesa } from "../components/MenuHamburguesa";
import { getAvisos } from "../redux/thunksAvisos";
import { Cabecera } from "../components/Cabecera";

export const Inicio = () => {
  const nombre=useSelector((state)=>state.auth.user.nombre);
  const {user_id, gestor_fincas}=useSelector((state)=>state.auth.user);
  const {is_authenticated, is_loading}=useSelector((state)=>state.auth);
  const roles=useSelector((state)=>state.auth.roles_list);  

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();

  const [rolGestion, setRolGestion]=useState([]);
  const [rolDist, setRolDist]=useState([]);
  const [isGestor, setIsGestor] = useState(false);

  useEffect(()=>{
    // if(user_id && location.pathname){
    //   dispatch(getRoles());
    //   return;
    // }

    if(!is_authenticated && !is_loading){
      dispatch(getRefresh(navigate));
    }

  }, [user_id, is_authenticated, is_loading, location]);

  useEffect(()=>{
    setRolGestion(()=>roles.filter((item)=>item.rol === 'gestor'));
    setRolDist(()=>roles.filter((item)=>item.rol !== 'gestor'));
  }, [roles]);

  const changeChecked=(e)=>{
    setIsGestor(e.target.checked);
  }

  return (
    <>
    <PlantillaGeneral>
      <div className="w-full h-auto flex flex-col items-center box-border flex-1">
        {/* <div className="w-full h-24 flex justify-between sm:justify-end bg-blue-900 items-center p-3.5 sm:gap-3">
          <MenuHamburguesa/>                     
          <BtnSalir/> 
        </div> */}
        <Cabecera/>
        <div className="w-full flex-col sm:flex-row justify-between items-center px-5 sm:px-15 py-2">
          { gestor_fincas &&
          <div className="w-full flex justify-between sm:justify-end gap-2 sm:gap-30 mt-3">
            <article onClick={()=>navigate('/nuevo-comunidad')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer"><Icono name={'other_houses'} className="text-blue-900"/>Comunidades</article>
            <article onClick={()=>navigate('/ficheros')} className="flex flex-col font-text font-bold items-center hover:cursor-pointer"><Icono name={'upload_file'} className="text-blue-900"/>Subir CSV</article>               
          </div>
          }
        </div>
        <Menu/>
      </div>           
    </PlantillaGeneral>
    </>
  )
}
