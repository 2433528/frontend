import { useSelector } from "react-redux"
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


export const NuevoConvocatoria = ({datos=null}) => {
    const {token, rol} = useSelector((state)=>state.auth);
    const {actual} = useSelector((state)=>state.comunidad);
    const navigate=useNavigate();

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
        localStorage.setItem('lista', JSON.stringify(puntosNuevos));
        setPuntoActual("");
        return;
    }
    setPuntos([...puntos, { descripcion: puntoActual }]);
    localStorage.setItem('lista', JSON.stringify(puntos));
    setPuntoActual("");
    };

    const eliminarPunto=async(descripcion)=>{
        const punto=puntos.find((p)=>p.descripcion === descripcion);
        await delPunto(token, punto.id);
        setPuntos(()=>puntos.filter((p)=>p.descripcion !== descripcion));
        localStorage.setItem('lista', JSON.stringify(puntos));
    }

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
            return;
        }
    
        await nuevaConvocatoria(token, {...form, puntos});
        setPuntos([]);
        setPuntosNuevos([]);
        localStorage.removeItem('lista');
        handleReset();
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={datos? 'Convocatoria':'Crear Convocatoria'}/>
            <Contenedor>
            
            {(celebrada && rol === 'gestor') && <Btn text={datos? "Ver detalle":"Crear Acta"} type="button" onClick={()=>navigate(`/nuevo-acta/?id=${datos.id}`)}/>}
            {
                (datos && fechaPasada) &&
                <div className="bg-yellow-200 p-2 rounded-lg" hidden={rol !== 'gestor'}>
                    <p>⚠️ Esta convocatoria ya no se puede modificar.</p>
                </div>
            }   
                <Formulario onSubmit={handleSubmit}>
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>  
                    <h2 className="text-3xl font-bold self-start">Datos</h2>
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>
                    <Input
                        label={'Título'}
                        type="text"
                        name="titulo"
                        value={titulo}
                        disabled={fechaPasada || rol !== 'gestor'}
                        onChange={handleChange}
                    />

                    <label className="font-semibold text-gray-700">Tipo</label>
                    <select name="tipo" value={tipo} onChange={handleChange} disabled={fechaPasada || rol !== 'gestor'}
                        className="border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none"
                    >
                        <option value="ordinaria">Ordinaria</option>
                        <option value="extraordinaria">Extraordinaria</option>
                    </select>

                    <label className="font-semibold text-gray-700">Convocatoria</label>
                    <select name="num_convocatoria" value={num_convocatoria} onChange={handleChange} disabled={fechaPasada || rol !== 'gestor'}
                        className="border border-gray-300 p-2 rounded-lg focus:outline-none"
                    >
                        <option value="primera">Primera</option>
                        <option value="segunda">Segunda</option>
                    </select>
                    
                    <Input
                        label={'Lugar'}
                        type="text"
                        name="lugar"
                        value={lugar}
                        disabled={fechaPasada || rol !== 'gestor'}
                        onChange={handleChange}
                    />
                    
                    <Input
                        label={'Fecha'}
                        type="date"
                        name="fecha"
                        value={fecha}
                        disabled={fechaPasada || rol !== 'gestor'}
                        onChange={handleChange}
                    />
                    
                    <Input
                        label={'Hora'}
                        type="time"
                        name="hora"
                        value={hora}
                        disabled={fechaPasada || rol !== 'gestor'}
                        onChange={handleChange}
                    />
                    <small hidden={fechaPasada || rol !== 'gestor'}>*Tiempo de cortesia: 10 min después de la hora.</small>                    
                    <Checked
                        text={'Celebrada'}                        
                        name="celebrada"
                        checked={celebrada}
                        disabled={fechaPasada || rol !== 'gestor'}
                        onChange={handleCelebradaChange}
                    />
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>
                    <h2 className="text-2xl font-bold self-start my-1">Puntos del día</h2>
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>                    
                    <ul className="w-full mb-4">
                        {
                            puntos.map((punto)=>(
                                <li key={uuid()} className="text-[1rem] my-1 border border-blue-900 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <Icono name={'fiber_manual_record'} className="icon-sm"/>
                                        {punto?.descripcion}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {(!fechaPasada && rol === 'gestor') && <Btn text="Modificar" type="button" onClick={()=>editarPunto(punto?.descripcion)}/>}
                                        {(!fechaPasada && rol === 'gestor') && <Btn text="Eliminar" type="button" onClick={()=>eliminarPunto(punto?.descripcion)}/>} 
                                    </div>                 
                                </li>
                            ))
                        }
                    </ul>
                    <textarea
                        className="border border-blue-900 focus:outline-none p-3 h-36 w-full rounded-lg resize-none"
                        name="punto"
                        placeholder="Escribe un punto del día..."
                        cols={30}
                        rows={2} 
                        value={puntoActual}
                        hidden={fechaPasada || rol !== 'gestor'}
                        onChange={(e)=>setPuntoActual(e.target.value)}

                    />
                    <Btn text="Agregar Punto" type="button" onClick={agregarPunto} disabled={fechaPasada || rol !== 'gestor'} hidden={rol !== 'gestor'}/>                
                    <Btn text={datos? 'Modificar':'Crear'} type="submit" disabled={fechaPasada || rol !== 'gestor'} hidden={rol !== 'gestor'}/>
                </Formulario>
            </Contenedor>
        </PlantillaGeneral>    
    </>
  )
}
