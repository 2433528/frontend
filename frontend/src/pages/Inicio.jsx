import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComActual} from "../redux/thunksComunidad";
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { getRefresh, getRoles} from "../redux/thunks";
import { ComunidadesList } from "../components/ComunidadesList";
import { Checked } from "../components/Checked";


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
    setRolDist(()=>roles.filter((item)=>item.rol !== 'gestor'))
  }, [roles]);

  const changeChecked=(e)=>{
    setIsGestor(e.target.checked);
  }

  return (
    <>
      <div className="bg-linear-to-tl from-blue-400 to-blue-900 h-screen w-screen flex flex-col items-center">
        <div className="w-screen flex justify-between p-3 md:p-5 bg-linear-to-b from-blue-400 to-blue-900 shadow shadow-blue-900">
          <h1 className="font-retro text-3xl md:text-6xl text-white font-bold">MiComunidapp</h1>
          <BtnSalir/> 
        </div>
          <h2 className="font-text font-bold text-3xl md:text-4xl text-white my-10">👋 Hola {nombre}</h2>
          {
            (rolGestion && rolGestion.length > 0) &&
            <div className="flex items-center">              
              <label className="font-text text-2xl md:text-3xl text-white mr-5">Entrar como gestor</label>
              <Checked name={'gestor'} onChange={(e)=>changeChecked(e)}/>
            </div>
          }
          <section className="bg-white p-5 md:p-15 m-5 rounded-lg">
          {(rolGestion && rolGestion.length > 0 && isGestor) && <ComunidadesList list={rolGestion} rol={'gestor'}/>}
          {(rolDist && rolDist.length > 0 && !isGestor) && <ComunidadesList list={rolDist}/>}
          </section>        
      </div>
    </>
  )
}
