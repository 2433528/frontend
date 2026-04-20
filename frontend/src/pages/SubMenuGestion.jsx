import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { BtnMenu } from "../components/BtnMenu";

export const SubMenuGestion = () => {
    const {rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
    if (rol) return;

        if (!rol && !is_loading && !is_authenticated){
            dispatch(getRefresh(navigate));
        }

    }, [rol, is_loading, is_authenticated]);

  return (
    <>
        <BtnMenu/>
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
