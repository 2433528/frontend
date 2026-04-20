import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComActual} from "../redux/thunksComunidad";
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { getRefresh, getRoles} from "../redux/thunks";
import { ComunidadesList } from "../components/ComunidadesList";


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
      <div>
          <h1>👋 Hola {nombre}</h1>
          {
            (rolGestion && rolGestion.length > 0) &&
            <div>
              <label>Entrar como gestor</label>
              <input type="checkbox" name="gestor" onChange={(e)=>changeChecked(e)}/>
            </div>
          }
          <section>
          {(rolGestion && rolGestion.length > 0 && isGestor) && <ComunidadesList list={rolGestion} rol={'gestor'}/>}
          {(rolDist && rolDist.length > 0 && !isGestor) && <ComunidadesList list={rolDist}/>}
          </section>
        <BtnSalir/>
      </div>
    </>
  )
}
