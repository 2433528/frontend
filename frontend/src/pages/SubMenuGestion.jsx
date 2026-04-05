import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const SubMenuGestion = () => {
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
        <h1>Gestión</h1>
        <section>
            <article onClick={()=>navigate(`/nuevo-propietario`)} style={{border: '2px solid black', margin: '1.5%'}}>Nuevo Propietario</article>
            <article onClick={()=>navigate('/nuevo-propiedad')} style={{border: '2px solid black', margin: '1.5%'}}>Nueva Propiedad</article>
            <article onClick={()=>navigate('/propietarios')} style={{border: '2px solid black', margin: '1.5%'}}>Lista de Propietarios</article>
            <article onClick={()=>navigate('/propiedades')} style={{border: '2px solid black', margin: '1.5%'}}>Lista de Propiedades</article>
        </section>
    </>
  )
}
