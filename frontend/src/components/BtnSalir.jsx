import { useDispatch, useSelector} from "react-redux"
import { getLogout } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { Icono } from "./Icono";


export const BtnSalir = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const salir=()=>{      
      dispatch(getLogout(navigate));      
    }

  return (
    <>
        <button
          onClick={salir}
          className="text-white md:text-2xl md:p-3 rounded-md flex cursor-pointer hover:bg-none hover:bg-blue-200 hover:text-blue-900 items-center">            
            Salir
            <Icono name="logout" className="ml-2"/>
        </button>
    </>
  )
}
