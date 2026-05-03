import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { getRefresh } from "../redux/thunks";
import { changeActa, getActa, saveAsistentes } from "../services/actas";
import { getAsistentes, getPresentes, getPropietarios } from "../services/usuarios";
import { useForm } from "../hooks/useForm";
import { changeVotacion, getVotacion, nuevaVotacion, nuevoVoto } from "../services/votacion";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Cabecera } from "../components/Cabecera";
import { Titulo } from "../components/Titulo";
import { Item } from "../components/Item";
import { Contenedor } from "../components/Contenedor";
import { Footer } from "../components/Footer";
import { Checked } from "../components/Checked";
import { Btn } from "../components/Btn";
import { Icono } from "../components/Icono";
import { Input } from "../components/Input";
import { Paginacion } from "../components/Paginacion";
import { usePaginate } from "../hooks/usePaginate";

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
                if (!data) return;
                setDatos(data);
                if (data?.resuelta){
                    const data2=await getPresentes(token, data.id)
                    const lista=data2.map(user=>({...user?.usuario, presente:user?.presente, representante:user?.representante}));
                    setAsistentes(lista);
                }else{
                    const data2 = await getAsistentes(token);
                    if (!data2) return;
                    setAsistentes(data2);
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
        <PlantillaGeneral>
        <Cabecera/>
        <Titulo titulo={'Votación Acta'}/>        
        <Contenedor>
            {(rol === 'gestor' && (datos?.resuelta || resuelta)) && 
                <div className="bg-yellow-200 p-2 rounded-lg">
                    <p>⚠️ Esta votación ya no se puede modificar.</p>
                </div>
            }
            <Item>                
                <p className="text-3xl my-4"><strong>{datos?.pertenece_convocatoria?.titulo}</strong></p>
                <p>Fecha: <strong>{datos?.pertenece_convocatoria?.fecha_lectura}</strong></p>
                <p>Hora: <strong>{datos?.pertenece_convocatoria?.hora}</strong></p>
                <p>Lugar: <strong>{datos?.pertenece_convocatoria?.lugar}</strong></p>
                <p>Tipo: <strong>{datos?.pertenece_convocatoria?.tipo}</strong></p>
                <p>Convocatoria: <strong>{datos?.pertenece_convocatoria?.num_convocatoria}</strong></p>
                <p>Creador: <strong>{datos?.pertenece_convocatoria?.creador?.nombre} {datos?.pertenece_convocatoria?.creador?.apellido1} {datos?.pertenece_convocatoria?.creador?.apellido2}</strong></p>
                <hr className="my-4 border-2 border-blue-900 rounded-lg"/>
                <p className={`${(datos?.resuelta || resuelta)? "bg-green-600":"bg-orange-400"} my-3 p-2 max-w-max rounded-lg`}>{(datos?.resuelta || resuelta)? 'Resuelta':'Pendiente'}</p>
                <div hidden={rol !== 'gestor'} className="flex items-center">
                    <Checked text={'Cerrar Acta'} checked={datos?.resuelta? datos?.resuelta:resuelta} onChange={()=>handleChangeResuelta(datos?.id)} disabled={datos?.resuelta || rol !== 'gestor' || resuelta}/>
                </div>
                <hr className="my-4 border-2 border-blue-900 rounded-lg"/>
                <h2 className="text-2xl font-bold text-center">Puntos del día</h2>

                <ul>
                    {
                    ((datos?.pertenece_convocatoria?.lista_puntos)? datos?.pertenece_convocatoria?.lista_puntos:[]).map((punto)=>(
                        <li key={punto.id}>                            
                            <p className="text-[1rem] flex items-center font-semibold my-5"><Icono name={'fiber_manual_record'} className="icon-sm"/>{punto.descripcion}</p>
                            {
                                (!punto?.votacion?.cierre && !punto?.votacion?.abierta && !datos?.resuelta)
                                ?<Btn onClick={()=>crearVotacion(punto.id)} text="Abrir Votación" disabled={datos?.resuelta || resuelta} hidden={rol !== 'gestor'}/>
                                :<>
                                    <div className="flex items-center gap-4">
                                        <Btn onClick={()=>votoFavor(punto?.votacion?.id)} text="Favor" disabled={punto?.votacion?.voto} hidden={rol === 'gestor' || punto?.votacion?.cierre}/>
                                        <Btn text="Abstención" hidden={rol === 'gestor' || punto?.votacion?.cierre} disabled={punto?.votacion?.voto} onClick={()=>votoAbstencion(punto?.votacion?.id)}/>
                                        <Btn text="Contra" hidden={rol === 'gestor' || punto?.votacion?.cierre} disabled={punto?.votacion?.voto} onClick={()=>votoContra(punto?.votacion?.id)}/>
                                        {(rol === 'gestor' && !datos?.resuelta && !resuelta) && <Btn text="Cerrar Votación" disabled={punto?.votacion?.cierre} onClick={(e)=>cerrarVotacion(e, punto?.votacion?.id)}/>}
                                    </div>

                                    <div hidden={!punto?.votacion?.cierre}>
                                        <div className="border border-blue-900 text-[0.8rem] md:text-[1rem] w-full md:w-1/2 text-center flex flex-col justify-center rounded-lg overflow-hidden">
                                            <table className="border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-500 text-white">
                                                        <th>Favor</th>
                                                        <th>Abstención</th>
                                                        <th>Contra</th>
                                                    </tr>
                                                </thead>
                                                <tbody>                                            
                                                    <tr>
                                                        <td>{punto?.votacion?.voto_favor}</td>
                                                        <td>{punto?.votacion?.voto_contra}</td>
                                                        <td>{punto?.votacion?.abstencion}</td>
                                                    </tr>
                                                </tbody>
                                            </table>                                    
                                        </div>
                                        <p className={`${punto?.votacion?.favorable? "bg-green-600":"bg-red-300"} text-[0.8rem] md:text-[1rem] max-w-max mt-3 p-2 rounded-lg`}><strong>{punto?.votacion?.favorable? 'Favorable':'No favorable'}</strong></p>
                                    </div>
                                </>
                            }
                            <hr className="my-4 border border-blue-900 rounded-lg"/>
                        </li>
                    ))
                    }
                </ul>

                <h3 hidden={rol !== 'gestor' && !datos?.resuelta && !resuelta} className="font-semibold">Comentarios</h3>

                <textarea
                className={`${(datos?.resuelta || resuelta) && "hover:cursor-not-allowed"} border border-blue-900 focus:outline-none p-3 h-52 w-full rounded-lg resize-none`}
                    name="resumen"
                    value={resumen}
                    onChange={handleChange}
                    hidden={rol !== 'gestor' && !datos?.resuelta && !resuelta}
                    disabled={datos?.resuelta || resuelta}
                />
            </Item>
            <Item hidden={rol !== 'gestor'}>            
                    <h2 className="text-2xl font-bold text-center mb-5">Propietarios Asistentes:</h2>

                    <ul>
                        {
                            asistentes.map((prop)=>(
                            <li key={prop.id}>
                                <p className="font-bold">{prop?.nombre} {prop?.apellido1} {prop?.apellido2}</p>
                                <p>{prop?.dni}</p>
                                <p>{prop?.rol_info}</p>
                                <p>Propiedad: <strong>{prop?.propiedad}</strong></p>
                                <Checked
                                text={'Presente'}
                                    name="presente"
                                    checked={prop?.presente || false}
                                    disabled={resuelta || datos?.resuelta}
                                    onChange={(e) => manejarCambio(prop.id, 'presente', e.target.checked)}
                                />

                                <Input
                                    label={'Representante'}
                                    type="text"
                                    name="representante"
                                    value={prop.representante || ""}
                                    placeholder="Nombre del representante..."
                                    onChange={(e) => manejarCambio(prop.id, 'representante', e.target.value)}
                                    disabled={resuelta || prop.presente || datos?.resuelta}
                                />
                                <hr className="my-4 border border-blue-900 rounded-lg"/>
                            </li>
                        ))
                        }
                    </ul>
                </Item>
            </Contenedor>
            <Footer/>
        </PlantillaGeneral>
    </>
  )
}
