import { useDispatch, useSelector } from "react-redux"
import { BtnSalir } from "../components/BtnSalir";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRefresh } from "../redux/thunks";


export const Menu = () => {
    const rol=useSelector((state)=>state.auth.rol);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if (!rol){
            dispatch(getRefresh(navigate));
            console.log(rol);
        }
      }, [rol]);
  return (
    <>
        <div>
            <div>
                <section>
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Comunicados</article>
                    {(rol === 'gestor') && <article onClick={()=>navigate('/menu-gestion')} style={{border: '2px solid black' , margin: '1.5%'}}>Gestion Propietarios</article>}
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Actas</article>
                    <article onClick={()=>navigate('/incidencias')} style={{border: '2px solid black', margin: '1.5%'}}>Incidencias</article>
                    <article onClick={()=>navigate('/tablon')} style={{border: '2px solid black', margin: '1.5%'}}>Informacion</article>
                </section>
            </div>
            <BtnSalir/>
        </div>
    
    </>
  )
}
