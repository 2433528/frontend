import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutesGestor = () => {
    const rol=useSelector((state)=>state.auth.rol);
  return (
    <>
        {
            (rol === 'gestor')? <Outlet/>:<Navigate to={'/menu'}/>
        }
    </>
  )
}