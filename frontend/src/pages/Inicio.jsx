import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComActual} from "../redux/thunksComunidad";
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { getRefresh, getRoles} from "../redux/thunks";
import { ComunidadesList } from "../components/ComunidadesList";
import { Checked } from "../components/Checked";
import { Footer } from "../components/Footer";


export const Inicio = () => {
  const nombre=useSelector((state)=>state.auth.user.nombre);
  const user_id=useSelector((state)=>state.auth.user.user_id);
  const {is_authenticated, is_loading}=useSelector((state)=>state.auth);
  const roles=useSelector((state)=>state.auth.roles_list);  

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [rolGestion, setRolGestion]=useState([]);
  const [rolDist, setRolDist]=useState([]);
  const [isGestor, setIsGestor] = useState(false);

  useEffect(()=>{
    if(user_id){
      dispatch(getRoles());
      return;
    }

    if(!is_authenticated && !is_loading){
      dispatch(getRefresh(navigate));
    }

  }, [user_id, is_authenticated, is_loading]);

  useEffect(()=>{
    setRolGestion(()=>roles.filter((item)=>item.rol === 'gestor'));
    setRolDist(()=>roles.filter((item)=>item.rol !== 'gestor'));
  }, [roles]);

  const changeChecked=(e)=>{
    setIsGestor(e.target.checked);
  }

  return (
    <>      
      <div className=" w-full h-screen flex flex-col items-center box-border">
        <div className="w-full flex justify-between p-3 md:p-5 bg-linear-to-t from-transparent to-blue-900/80 items-center">
          <h1 className="font-retro text-3xl sm:text-6xl text-blue-900">MiComunidapp</h1>                  
          <BtnSalir/> 
        </div> 
        <p className="font-text font-bold text-3xl text-blue-900 my-5">👋 Hola {nombre}</p>                 
          {
            // (rolGestion && rolGestion.length > 0) &&
            // <div className="flex items-center">              
            //   <label className="font-text text-2xl md:text-3xl text-blue-900 mr-5">Entrar como gestor</label>
            //   <Checked name={'gestor'} onChange={(e)=>changeChecked(e)}/>
            // </div>
          }
          {
            (rolGestion && rolGestion.length > 0)
            ?
            <div className="bg-white p-2 sm:p-15 rounded-lg flex items-center w-full gap-2 sm:gap-20 box-border">
            {(rolGestion && rolGestion.length > 0) && <div className="w-1/2 h-full bg-blue-800 rounded-lg p-2 sm:p-5"><ComunidadesList list={rolGestion} rol={'gestor'}/></div>}
            {(rolDist && rolDist.length > 0) && <div className="w-1/2 border border-blue-800 rounded-lg p-2 sm:p-5"><ComunidadesList list={rolDist}/></div>}
            </div> 
            :
            <div className="bg-white p-2 sm:p-15 rounded-lg flex items-center w-full">
              {(rolDist && rolDist.length > 0) && <div className="w-1/2 border border-blue-800 rounded-lg p-2 sm:p-5"><ComunidadesList list={rolDist}/></div>}
            </div> 
          }       
      </div>
      <Footer/>
    </>
  )
}
