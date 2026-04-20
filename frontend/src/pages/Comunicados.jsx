import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh,} from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { usePaginate } from "../hooks/usePaginate";
import { changeLeido, getcomunicados} from "../services/comunicados";
import {v4 as uuid} from 'uuid';
import { BtnMenu } from "../components/BtnMenu";

export const Comunicados = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);

    const [abiertoId, setAbiertoId] = useState();

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);

    const comunicadosFetch = async () => {
        if (!token || !comunidad?.id || is_loading) return;

        const data =await getcomunicados(comunidad.id, token, rol);

        if (!data) return;
        actualizarEstado(data);
    };

    useEffect(()=>{
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
        };

        comunicadosFetch();
        return;
    }, [comunidad?.id, token, is_loading, is_authenticated, rol]);

    const marcarLeido=async(leido, id)=>{
        if (leido){
            const confirm=window.confirm('Esta acción no se puede deshacer.¿Continuar?')
            if(confirm){
                const ok=await changeLeido(token, id);
                if (!ok)return;
                const ok2=await comunicadosFetch();
                if (!ok2)return;
            }

            setDatos(prev => 
                prev.map(m => m.id === id ? { ...m, leido: true } : m)
            );
        }
    }

  return (
    <>
        <BtnMenu/>
        <h1>Comunicados</h1>        
        {(rol === 'gestor') && <button onClick={()=>navigate('/nuevo-comunicado')}>Nuevo</button>}

        {datos.map((com)=>(
            <div key={com?.id}>
                <h2>{com?.titulo}</h2>
                <p><strong>Fecha: </strong>{com?.fecha_creacion}</p>
                <p><strong>Texto: </strong>{com?.texto}</p>
                {(rol === 'gestor') && <button onClick={()=>setAbiertoId(abiertoId === com?.id ? null:com?.id)}>Enviado a...</button>}

                {
                    (rol !== 'gestor')
                    ?<>
                        <input
                            type="checkbox"
                            name="leido"
                            checked={com?.leido || false}
                            disabled={com?.leido}
                            onChange={(e)=>marcarLeido(e.target.checked, com?.comunicadousuario)}
                        />
                        <label>Leido</label>
                    </>

                    : ((abiertoId === com?.id && com?.usuarios)? com?.usuarios:[]).map((usu)=>(
                        <div key={uuid()}>
                            <p>{usu?.nombre}</p>
                            <p>{usu?.dni}</p>

                            <input
                            type="checkbox"
                            name="leido"
                            checked={usu?.leido}
                            disabled={true}
                        />
                        <label>Leido</label>
                        </div>
                    ))
                }
            </div>
        ))}
        <div>
            <button onClick={getPrevious} disabled={!paginate.previous}>Anterior</button>
            <button onClick={getNext} disabled={!paginate.next}>Siguiente</button>
        </div>
    </>
  )
}
