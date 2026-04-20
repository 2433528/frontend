import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { getRefresh } from "../redux/thunks";
import { changeActa, getActa, saveAsistentes } from "../services/actas";
import { getPropietarios } from "../services/usuarios";
import { useForm } from "../hooks/useForm";
import { changeVotacion, getVotacion, nuevaVotacion, nuevoVoto } from "../services/votacion";

export const DetalleActa = () => {
    const {token, is_loading, is_authenticated, rol}=useSelector((state)=>state.auth);
    const location=useLocation();
    const {id=''}=queryString.parse(location.search);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [datos, setDatos]=useState({});
    const [asistentes, setAsistentes]=useState([]);
    const [resuelta, setResuelta]=useState(datos?.resuelta || false);

    const {resumen, handleChange, handleReset}=useForm({resumen:''});

    useEffect(() => {
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
        }

        if (token && !is_loading && is_authenticated) {
            const cargarDatos = async () => {
                const data = await getActa(id, token);

                if (!data) {
                    dispatch(getRefresh(navigate));
                } else {
                    setDatos(data);                    
                    const data2 = await getPropietarios(token);
                    if (!data2) {
                        dispatch(getRefresh(navigate));
                    } else {
                        setAsistentes(data2.results);
                    }
                }
            };
            cargarDatos();
        }
        return;
    }, [token, is_authenticated, is_loading]);

    const handleChangeResuelta=async(id)=>{
        const confirm=window.confirm('¿Cerrar el  acta y la votación?')
        
        if (!confirm)return;

        const datosAEnviar={
            resuelta:true,
            timestamp_fin:new Date().toISOString(),
            resumen
        }

        const asistentesEnviar=asistentes.map((asistente)=>{
            return {            
                acta:datos?.id,
                usuario:asistente?.id,
                presente:asistente?.presente,
                representante:asistente?.representante                    
            }
        });

        const ok1=await saveAsistentes(token, {asistentes:asistentesEnviar});
        if(!ok1)return;
        const ok2=await changeActa(token, id, datosAEnviar);
        if(!ok2)return;
        setResuelta(true);
        handleReset();
    }

    const manejarCambio = (id, campo, valor) => {
        setAsistentes(prev => prev.map(asistente => {
            if (asistente.id === id) {
                return { 
                    ...asistente, 
                    [campo]: valor,
                    ...(campo === 'presente' && valor === true ? { representante: "" } : {})
                };
            }
            return asistente;
        }));
    };

    const crearVotacion=async(id_punto)=>{
        const ok=await nuevaVotacion(token, id_punto);
        if (!ok) return;

        const data = await getActa(id, token);
        if (data) setDatos(data);
    }

    const cerrarVotacion=async(e, id_votacion)=>{
        const boton=e.currentTarget;
        boton.disabled=true
        const ok=await changeVotacion(token, id_votacion, {abierta:false, cierre:new Date().toISOString()});
        if (!ok){
            boton.disabled=false;
            return;
        }

        const data = await getActa(id, token);
        if (data) setDatos(data);
    }

    const votoFavor=async(id_votacion)=>{
        const datosEnviar={
            opcion:'Favor',
            votacion:id_votacion,
        }

        const ok=await nuevoVoto(token, datosEnviar);
        if (!ok) return;

        const data = await getActa(id, token);
        if (data) setDatos(data);
    }

    const votoContra=async(id_votacion)=>{
        const datosEnviar={
            opcion:'Contra',
            votacion:id_votacion,
        }

        const ok=await nuevoVoto(token, datosEnviar);
        if (!ok) return;

        const data = await getActa(id, token);
        if (data) setDatos(data);
    }

    const votoAbstencion=async(id_votacion)=>{
        const datosEnviar={
            opcion:'Abstencion',
            votacion:id_votacion,
        }

        const ok=await nuevoVoto(token, datosEnviar);
        if (!ok) return;

        const data = await getActa(id, token);
        if (data) setDatos(data);
    }

  return (
    <>
        <h1>Votación</h1>

        <h2>Datos:</h2>
        <p><strong>{datos?.pertenece_convocatoria?.titulo}</strong></p>
        <p><strong>Fecha: </strong>{datos?.pertenece_convocatoria?.fecha_lectura}</p>
        <p><strong>Hora: </strong>{datos?.pertenece_convocatoria?.hora}</p>
        <p><strong>Lugar: </strong>{datos?.pertenece_convocatoria?.lugar}</p>
        <p><strong>Tipo: </strong>{datos?.pertenece_convocatoria?.tipo}</p>
        <p><strong>Convocatoria: </strong>{datos?.pertenece_convocatoria?.num_convocatoria}</p>
        <p><strong>Creador: </strong>{datos?.pertenece_convocatoria?.creador?.nombre} {datos?.pertenece_convocatoria?.creador?.apellido1} {datos?.pertenece_convocatoria?.creador?.apellido2}</p>
        <p><strong>Estado: </strong>{(datos?.resuelta || resuelta)? 'Resuelta':'Pendiente'}</p>
        <div hidden={rol !== 'gestor'}>
            <input type="checkbox" checked={datos?.resuelta? datos?.resuelta:resuelta} onChange={()=>handleChangeResuelta(datos?.id)} disabled={datos?.resuelta || rol !== 'gestor' || resuelta}/><label>Cerrar Acta</label>
        </div>
        <h2>Puntos del día:</h2>

        <ul>
            {
            ((datos?.pertenece_convocatoria?.lista_puntos)? datos?.pertenece_convocatoria?.lista_puntos:[]).map((punto)=>(
                <li key={punto.id}>
                    {punto.descripcion}
                    {
                        (!punto?.votacion?.cierre && !punto?.votacion?.abierta)
                        ?<button onClick={()=>crearVotacion(punto.id)} hidden={rol !== 'gestor'} disabled={datos?.resuelta || resuelta}>Abrir Votación</button>
                        :<>
                            <button hidden={rol === 'gestor' || punto?.votacion?.cierre} disabled={punto?.votacion?.voto} onClick={()=>votoFavor(punto?.votacion?.id)}>Favor</button>
                            <button hidden={rol === 'gestor' || punto?.votacion?.cierre} disabled={punto?.votacion?.voto} onClick={()=>votoAbstencion(punto?.votacion?.id)}>Abstención</button>
                            <button hidden={rol === 'gestor' || punto?.votacion?.cierre} disabled={punto?.votacion?.voto} onClick={()=>votoContra(punto?.votacion?.id)}>Contra</button>
                            {(rol === 'gestor') && <button disabled={punto?.votacion?.cierre} onClick={(e)=>cerrarVotacion(e, punto?.votacion?.id)}>Cerrar Votación</button>}

                            <div hidden={!punto?.votacion?.cierre}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Favor</th>
                                            <th>Abstención</th>
                                            <th>Contra</th>
                                        </tr>
                                        <tr>
                                            <td>{punto?.votacion?.voto_favor}</td>
                                            <td>{punto?.votacion?.voto_contra}</td>
                                            <td>{punto?.votacion?.abstencion}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p><strong>{punto?.votacion?.favorable? 'Favorable':'No favorable'}</strong></p>
                            </div>
                        </>
                    }
                </li>
            ))
            }
        </ul>

        <h3 hidden={rol !== 'gestor' && !datos?.resuelta && !resuelta}>Comentarios:</h3>

        <textarea
            name="resumen"
            value={resumen}
            onChange={handleChange}
            cols={40}
            rows={8}
            hidden={rol !== 'gestor' && !datos?.resuelta && !resuelta}
            disabled={datos?.resuelta || resuelta}
        />

        <div hidden={rol !== 'gestor'}>
            <h2>Propietarios Asistentes:</h2>

            <ul>
                {
                    asistentes.map((prop)=>(
                    <li key={prop.id}>
                        <p>{prop?.nombre} {prop?.apellido1} {prop?.apellido2}</p>
                        <p>{prop?.dni}</p>
                        <p>{prop?.rol_info}</p>
                        <p>Propiedad: {prop?.propiedad}</p>
                        <input
                            type="checkbox"
                            name="presente"
                            checked={prop.presente || false}
                            disabled={resuelta || prop.presente || datos?.resuelta}
                            onChange={(e) => manejarCambio(prop.id, 'presente', e.target.checked)}
                        />
                        <label>Presente</label>

                        <label>Representante</label>
                        <input
                            type="text"
                            name="representante"
                            value={prop.representante || ""}
                            placeholder="Nombre del representante..."
                            onChange={(e) => manejarCambio(prop.id, 'representante', e.target.value)}
                            disabled={resuelta || prop.presente || datos?.resuelta}
                        />
                    </li>
                ))
                }
            </ul>
        </div>
    </>
  )
}
