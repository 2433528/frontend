import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getRefresh } from "../redux/thunks";
import { getConvocatorias } from "../services/convocatorias";
import { usePaginate } from "../hooks/usePaginate";
import { BtnMenu } from "../components/BtnMenu";


export const Convocatorias = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();

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
        <BtnMenu/>
        <h1>Convocatorias</h1>
        {(rol === 'gestor') && <button onClick={()=>navigate('/nuevo-convocatoria')}>Nuevo</button>}
        
        <section>
            {
                datos.map((item)=>(
                    <article key={item.id}>
                        <p><strong>Fecha: </strong>{item?.fecha_lectura}</p>                        
                        <p><strong>Titulo:</strong>{item?.titulo}</p>
                        {(item?.celebrada) && <p><strong>Celebrada</strong></p>}
                        <button onClick={()=> navigate(`/detalle-convocatoria/?id=${item?.id}`)}>{(rol === 'gestor')? 'Ver detalles o modificar': 'Ver detalles'}</button>
                    </article>
                ))
            }
                        
            <div>
                <button onClick={getPrevious} disabled={!paginate.previous}>Anterior</button>
                <button onClick={getNext} disabled={!paginate.next}>Siguiente</button>
            </div>
        </section>
        <button onClick={()=>navigate('/actas')}>Actas</button>
    </>
  )
}
