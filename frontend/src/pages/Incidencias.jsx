import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh,} from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { changeInci, delInci, getInci } from "../services/incidencia";
import { store } from "../redux/store";
import { usePaginate } from "../hooks/usePaginate";

export const Incidencias = () => {
    const token=useSelector((state)=>state.auth.token);
    const user=useSelector((state)=>state.auth.user);
    const rol=useSelector((state)=>state.auth.rol);
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

    const inciFetch = async () => {
        try {
            const data = await getInci(comunidad.id, token);

            if (!data){   
                dispatch(getRefresh(navigate))                
                .then(async()=>{
                    const newToken = store.getState().auth.token;
                    const newComunidad = store.getState().comunidad.actual.id;
                    const data2=await getInci(newComunidad, newToken);
                    actualizarEstado(data2);
                    if (!data2){
                        return;
                    }
                });
                
                return;
            }

            actualizarEstado(data);
        } 
        catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        inciFetch();
    }, [comunidad.id]);

    const handleDelete=(id)=>{
        const dts=datos.filter((dato)=>dato.id !== id);
        const confirmar=window.confirm('¿Estas seguro de eliminar esta inidencia?')
        if(!confirmar) return;
        setDatos(dts);
        delInci(token, id);
    }

    const cambiarEstado=async(id, estado)=>{
        const indidencia=datos.find((i)=>i.id===id);
        if (estado === 'resuelta' && indidencia.estado === 'proceso'){
            const confirmar=window.confirm('¿Estas seguro de marcar esta inidencia como resuelta?')
            if(!confirmar) return;
        }
        const change=await changeInci(token, estado, id);            
        if (change && change.mensaje !== ''){
            setDatos((datosOld)=>datosOld.map((d)=>(d.id === id)? {...d, estado}:d));
            alert('Estado cambiado');
        }
    }

  return (
    <>
        <h1>Incidencias</h1>
        <small>{(rol !== 'gestor') && '*Solo se veran las incidencias creadas por ti.'}</small>
        <section>
            <button onClick={()=>navigate('/nuevo-inci')}>Nuevo</button>
            {
                datos.map((dato)=>(
                    <div key={dato.id}>
                        <h2>{dato.titulo}</h2>
                        <p><strong>Fecha: </strong>{dato.fecha_creacion}</p>
                        <p><strong>Descripción: </strong>{dato.texto}</p>
                        {
                            (dato.estado !== 'resuelta' && rol === 'gestor')
                            ? 
                                <select name="estado" value={dato.estado} onChange={(e)=>cambiarEstado(dato.id, e.target.value)}>
                                    <option value="inicio">Inicio</option>
                                    <option value="proceso">Proceso</option>
                                    <option value="resuelta">Resuelta</option>
                                </select>                               
                            : <p><strong>Estado: {dato.estado}</strong></p>
                        }

                        {
                            (rol === 'gestor') && <button onClick={()=>handleDelete(dato.id)}>Eliminar</button>
                        }                  
                    </div>
                ))
            }

            <div>
                {(paginate.previous) && <button onClick={getPrevious}>Anterior</button>}
                {(paginate.next) && <button onClick={getNext}>Siguiente</button>}
            </div>
        </section>
    </>
  )
}
