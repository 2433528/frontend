import { useDispatch} from "react-redux"
import { getLogout } from "../redux/thunks";
import { useNavigate } from "react-router-dom";


export const BtnSalir = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const salir=()=>{      
      dispatch(getLogout(navigate));      
    }

  return (
    <>
        <button onClick={salir}>Salir</button>
    </>
  )
}
