import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getRefresh } from "../redux/thunks";
import { usePaginate } from "../hooks/usePaginate";
import { getActas } from "../services/actas";
import { BtnMenu } from "../components/BtnMenu";

export const Actas = () => {
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

    const actaFetch = async () => {
        if (!token || !comunidad?.id || is_loading) return;

        try {
            const data = await getActas(comunidad, token);

            if (!data) return;
            actualizarEstado(data);
            
        } catch (error) {
            console.log("Error en peticion:", error);
        }
    };

    useEffect(()=>{
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));            
        };

        actaFetch();
        return;
    }, [comunidad?.id, token, is_loading, is_authenticated]);

  return (
    <>
        <BtnMenu/>
        <h1>Actas</h1>
        
        <ul>
            {datos.map((acta)=>(
                <li key={acta.id}>
                    <h2>{acta.pertenece_convocatoria?.titulo}</h2>
                    <p><strong>{acta.pertenece_convocatoria?.fecha_lectura}</strong></p>
                    <button onClick={()=>navigate(`/detalle-acta/?id=${acta.id}`)}>Votación Detalle</button>
                </li>
            ))}
        </ul>

        <div>
            <button onClick={getPrevious} disabled={!paginate.previous}>Anterior</button>
            <button onClick={getNext} disabled={!paginate.next}>Siguiente</button>
        </div>
    </>
  )
}
