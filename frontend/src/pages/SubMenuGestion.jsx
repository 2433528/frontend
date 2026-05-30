import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Cabecera } from "../components/Cabecera";
import { Icono } from "../components/Icono";
import { Titulo } from "../components/Titulo";
import { Footer } from "../components/Footer";
import { PlantillaGeneral } from "../components/PlantillaGeneral";

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
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Gestión Comunidad'}/>
            <div className="w-full md:w-8/12 mx-5 md:mx-10 z-30 px-10 md:px-30 relative">                          
                    <section className="grid grid-cols-2 grid-rows-3 my-10 items-center gap-3 box-content">
                        <article onClick={()=>navigate(`/nuevo-propietario`)} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg p-3 md:p-5 flex flex-col font-text font-bold items-center"><Icono name={'person_add'} className="text-blue-900 icon-md"/>Nuevo Propietario</article>
                        <article onClick={()=>navigate('/nuevo-propiedad')} className="row-start-1 row-end-2 bg-white ring-2 ring-blue-700 rounded-lg p-3 md:p-5 flex flex-col font-text font-bold items-center"><Icono name={'add_home'} className="text-blue-900 icon-md"/>Nueva Propiedad</article>
                        <article onClick={()=>navigate('/propietarios')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg p-3 md:p-5 flex flex-col font-text font-bold items-center"><Icono name={'patient_list'} className="text-blue-900 icon-md"/>Lista de Propietarios</article>
                        <article onClick={()=>navigate('/propiedades')} className="row-start-2 row-end-3 bg-white ring-2 ring-blue-700 rounded-lg p-3 md:p-5 flex flex-col font-text font-bold items-center"><Icono name={'list_alt'} className="text-blue-900 icon-md"/>Lista de Propiedades</article>                        
                    </section>                                
            </div>
            <Footer/>        
        </PlantillaGeneral>
    </>
  )
}
