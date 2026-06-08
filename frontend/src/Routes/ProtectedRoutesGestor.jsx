import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutesGestor = () => {
    const {rol, user}=useSelector((state)=>state.auth);
  return (
    <>
        {
          (user?.gestor_fincas || rol === 'gestor')? <Outlet/>:<Navigate to={'/inicio'}/>
        }
    </>
  )
}