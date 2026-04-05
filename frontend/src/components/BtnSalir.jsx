import { useDispatch, useSelector} from "react-redux"
import { getLogout } from "../redux/thunks";
import { useNavigate } from "react-router-dom";


export const BtnSalir = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const salir=()=>{      
      dispatch(getLogout(navigate));      
    }

  return (
    <>
        <button onClick={salir}>Salir</button>
    </>
  )
}
