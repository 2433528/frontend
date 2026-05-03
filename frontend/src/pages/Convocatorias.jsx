import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getRefresh } from "../redux/thunks";
import { getConvocatorias } from "../services/convocatorias";
import { usePaginate } from "../hooks/usePaginate";
import { Cabecera } from "../components/Cabecera";
import { Icono } from "../components/Icono";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Titulo } from "../components/Titulo";
import { Paginacion } from "../components/Paginacion";
import { BtnNuevo } from "../components/BtnNuevo";
import { Btn } from "../components/Btn";
import { Footer } from "../components/Footer";
import { Contenedor } from "../components/Contenedor";


export const Convocatorias = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {abierto}=useSelector((state)=>state.menu);

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);

    const convFetch = async () => {
        if (!token || !comunidad?.id || is_loading) return;

        const data = await getConvocatorias(comunidad, token);

        if (!data) return;
        actualizarEstado(data);
    };

    useEffect(()=>{
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));            
        };

        convFetch();
        return;
    }, [comunidad?.id, token, is_loading, is_authenticated]);

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Convocatorias'}/>                      
            <Contenedor>
                {(rol === 'gestor') && <BtnNuevo onClick={()=>navigate('/nuevo-convocatoria')}/>}
                <section>
                    {
                        datos.map((item)=>(
                            <article key={item.id} className="bg-white my-5 rounded-lg p-3 box-border z-20 relative font-text">
                                <div className="flex flex-col">
                                    <p className="whitespace-nowrap self-end">{item?.fecha_lectura}</p> 
                                    <p className="font-bold m-2">{item?.titulo}</p>                                                                                               
                                </div>
                                {(item?.celebrada)? <p className="bg-green-600 w-max p-2 rounded-lg m-2"><strong>Celebrada</strong></p>:<p className="bg-gray-300 w-max p-2 rounded-lg m-2"><strong>No Celebrada</strong></p>}
                                <Btn onClick={()=> navigate(`/detalle-convocatoria/?id=${item?.id}`)} text={(rol === 'gestor')? 'Ver detalles o modificar': 'Ver detalles'}/>                        
                            </article>
                        ))
                    }                                               
                </section>
                <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>
            </Contenedor>                           
            <Footer/>
        </PlantillaGeneral>            
    </>
  )
}
