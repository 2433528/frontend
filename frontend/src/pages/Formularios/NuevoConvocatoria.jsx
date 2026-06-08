import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';
import { changeConvocatoria, delPunto, nuevaConvocatoria } from "../../services/convocatorias";
import { Form, useNavigate } from "react-router-dom";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Btn } from "../../components/Btn";
import { Contenedor } from "../../components/Contenedor";
import { Item } from "../../components/Item";
import { Formulario } from "../../components/Formulario";
import { Input } from "../../components/Input";
import { Checked } from "../../components/Checked";
import { Icono } from "../../components/Icono";
import { Footer } from "../../components/Footer";


export const NuevoConvocatoria = ({datos=null}) => {
    const {token, rol} = useSelector((state)=>state.auth);
    const {actual} = useSelector((state)=>state.comunidad);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {titulo, tipo, fecha, num_convocatoria, lugar, hora, form, celebrada, comunidad, handleChange, handleReset, setForm}=useForm({
        titulo:'',
        tipo:'ordinaria',
        fecha:'',
        num_convocatoria:'primera',
        lugar:'',
        hora:'',
        celebrada:false,
        comunidad:actual?.id
    });

    const [puntos, setPuntos]=useState(JSON.parse(localStorage.getItem('lista')) || []);
    const [puntosNuevos, setPuntosNuevos]=useState([]);
    const [puntoActual, setPuntoActual]=useState('');

    const formatearFechaInput = (fechaMal) => {
        if (!fechaMal) return '';
        const [dia, mes, anio] = fechaMal.split('-');
        return `${anio}-${mes}-${dia}`;
    };

    const [fechaPasada, setFechaPasada] = useState(false);

    useEffect(()=>{
        if(datos){
            const fechaFormateada = formatearFechaInput(datos?.fecha_lectura);
            const esPasada = (datos?.fecha && datos?.hora)
            ? new Date(`${fechaFormateada}T${datos.hora}`) < new Date() 
            : false;

            setFechaPasada(esPasada || datos?.celebrada);

            setForm({
                titulo:datos?.titulo || '',
                tipo:datos?.tipo || 'ordinaria',
                fecha:fechaFormateada || '',
                num_convocatoria:datos?.num_convocatoria || 'primera',
                lugar:datos?.lugar || '',
                hora:datos?.hora || '',
                celebrada:datos?.celebrada || false,
                comunidad:actual?.id
            })

            setPuntos(datos?.lista_puntos || []);
        }        
    },[datos]);

    const handleCelebradaChange = async (e) => {
        const isChecked = e.target.checked;
        
        handleChange(e); 

        if (isChecked) {
            const confirmar = window.confirm("Al marcar como celebrada se cerrará la edición. ¿Continuar?");
            if (!confirmar){
                handleReset();
                return;
            }
            const datosAEnviar = { ...form, celebrada: true, puntos:puntosNuevos};
            const cambiado=await changeConvocatoria(token, datos?.id, datosAEnviar);
            if(!cambiado){
                setFechaPasada(false);
                setForm({...form, celebrada:false});
                return;
            };

            setFechaPasada(true);
            setForm({...form, celebrada:true});
        }
    };

    useEffect(()=>{
        if(celebrada){
            setFechaPasada(true);
        }
    }, [celebrada]);

    const agregarPunto = () => {
        if (puntoActual.trim() === "") return;
        if (datos){
            setPuntosNuevos([...puntosNuevos, { descripcion: puntoActual }]);
            setPuntos([...puntos, { descripcion: puntoActual }]);
            setPuntoActual("");
            return;
        }
        setPuntos([...puntos, { descripcion: puntoActual }]);
        setPuntoActual("");
    }

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(puntosNuevos));
    },[puntosNuevos]);

    const eliminarPunto=async(descripcion)=>{
        const punto=puntos.find((p)=>p.descripcion === descripcion);
        await delPunto(token, punto.id);
        setPuntos(()=>puntos.filter((p)=>p.descripcion !== descripcion));
    }

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(puntos));
    },[puntos]);

    const editarPunto=(descripcion)=>{
        setPuntoActual(descripcion);
        setPuntos(()=>puntos.filter((p)=>p.descripcion !== descripcion));
        agregarPunto();
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (datos){
            const datosAEnviar = { ...form, puntos:puntosNuevos };
            await changeConvocatoria(token, datos?.id, datosAEnviar);
            setPuntosNuevos([]);
            localStorage.removeItem('lista');
            navigate('/convocatorias');
            return;
        }
    
        await nuevaConvocatoria(token, {...form, puntos});
        setPuntos([]);
        setPuntosNuevos([]);
        localStorage.removeItem('lista');
        handleReset();
        navigate('/convocatorias');
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={datos? 'Convocatoria':'Crear Convocatoria'}/>
            <Contenedor>
                        
            {
                (datos && fechaPasada) &&
                <div className="bg-yellow-200 p-2 rounded-lg" hidden={rol !== 'gestor' && rol !== 'presidente'}>
                    <p>⚠️ Esta convocatoria ya no se puede modificar.</p>
                </div>
            }   
                <Formulario onSubmit={handleSubmit}>
                    <hr className="my-2 border-2 border-blue-900 rounded-lg col-span-2 sm:col-span-3"/>  
                    <h2 className="text-3xl font-bold self-start col-span-2 sm:col-span-3">Datos</h2>
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>
                    <Input
                        addStyle={"col-span-2 sm:col-span-1"}
                        label={'Fecha'}
                        type="date"
                        name="fecha"
                        value={fecha}
                        disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                        onChange={handleChange}
                    />

                    <Input
                        addStyle={"col-span-2 sm:col-span-1"}
                        label={'Hora'}
                        type="time"
                        name="hora"
                        value={hora}
                        disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                        onChange={handleChange}
                    />

                    <Input
                        addStyle={"col-span-2 sm:col-span-1"}
                        label={'Lugar'}
                        type="text"
                        name="lugar"
                        value={lugar}
                        disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                        onChange={handleChange}
                    />

                    <Input
                        addStyle={"col-span-2 sm:col-span-3"}
                        label={'Título'}
                        type="text"
                        name="titulo"
                        value={titulo}
                        disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                        onChange={handleChange}
                    />

                    <div className="flex flex-col col-span-2 sm:col-span-1 mb-3">
                        <label className="font-semibold text-gray-700">Tipo</label>
                        <select name="tipo" value={tipo} onChange={handleChange} disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                            className={`bg-blue-100 p-2 rounded-lg focus:outline-none ${(rol !== 'gestor' && rol !== 'presidente') && "hover:cursor-not-allowed"}`}
                        >
                            <option value="ordinaria">Ordinaria</option>
                            <option value="extraordinaria">Extraordinaria</option>
                        </select>
                    </div>

                    <div className="flex flex-col col-span-2 sm:col-span-1 mb-3">
                        <label className="font-semibold text-gray-700">Convocatoria</label>
                        <select name="num_convocatoria" value={num_convocatoria} onChange={handleChange} disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                            className={`bg-blue-100 p-2 rounded-lg focus:outline-none ${(rol !== 'gestor' && rol !== 'presidente') && "hover:cursor-not-allowed"}`}
                        >
                            <option value="primera">Primera</option>
                            <option value="segunda">Segunda</option>
                        </select>  
                    </div>                  
                                                            
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>
                    <h2 className="text-2xl font-bold self-start my-1 col-span-2 sm:col-span-3">Puntos del día</h2>
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>                    
                    <ul className="w-full mb-4 col-span-2 sm:col-span-3">
                        {
                            puntos.map((punto)=>(
                                <li key={uuid()} className="text-[1rem] my-1 border border-blue-900 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <Icono name={'fiber_manual_record'} className="icon-sm"/>
                                        {punto?.descripcion}
                                    </div>
                                    {(rol === 'gestor' || rol === 'presidente') && <div className="flex items-center gap-2">
                                        {!fechaPasada && (rol !== 'gestor' || rol !== 'presidente') && <Btn text="Modificar" type="button" onClick={()=>editarPunto(punto?.descripcion)}/>}
                                        {!fechaPasada && (rol !== 'gestor' || rol !== 'presidente') && <Btn text="Eliminar" type="button" onClick={()=>eliminarPunto(punto?.descripcion)}/>} 
                                    </div>}               
                                </li>
                            ))
                        }
                    </ul>
                    <textarea
                        className="border border-blue-900 focus:outline-none p-3 h-16 w-full rounded-lg resize-none col-span-2 sm:col-span-3"
                        name="punto"
                        placeholder="Escribe un punto del día..." 
                        value={puntoActual}
                        hidden={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                        onChange={(e)=>setPuntoActual(e.target.value)}

                    />
                    <div className="flex flex-col items-center col-span-2 sm:col-span-3">
                    {(rol === 'gestor' || rol === 'presidente') && <Btn text="Agregar Punto" type="button" onClick={agregarPunto} disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')} addStyle={"sm:self-start"}/>}                                       
                    </div>
                    <div className="flex flex-col items-center col-span-2 sm:col-span-3">
                        <Btn addStyle={"w-full"} text={datos? 'Modificar':'Crear'} type="submit" disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')} hidden={rol !== 'gestor' && rol !== 'presidente'}/>
                    </div>
                    {(rol === 'gestor' || rol === 'presidente') && <div className="my-5 bg-blue-50 p-3 rounded-lg col-span-2 sm:col-span-3">
                        <small hidden={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}>*Tiempo de cortesia: 10 min después de la hora.</small>                    
                        <Checked                            
                            text={'Marcar como Celebrada'}                        
                            name="celebrada"
                            checked={celebrada}
                            disabled={fechaPasada || (rol !== 'gestor' && rol !== 'presidente')}
                            onChange={handleCelebradaChange}
                        />
                    </div>}
                </Formulario>
                {(celebrada && (rol === 'gestor' || rol === 'presidente')) && <Btn addStyle={"w-full"} text={datos? "Ver resumen del acta de esta convocatoria":"Crear Acta"} type="button" onClick={()=>navigate(`/nuevo-acta/?id=${datos.id}`)}/>}
            </Contenedor>        
        </PlantillaGeneral>    
    </>
  )
}
