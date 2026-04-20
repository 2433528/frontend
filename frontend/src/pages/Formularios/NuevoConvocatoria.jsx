import { useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';
import { changeConvocatoria, delPunto, nuevaConvocatoria } from "../../services/convocatorias";
import { useNavigate } from "react-router-dom";


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
            const esPasada = datos?.fecha && datos?.hora
            ? new Date(`${fechaFormateada}T${datos.hora}`) < new Date() 
            : false;
            
            setFechaPasada(esPasada && datos?.celebrada);

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
            if (confirmar) {
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
        <h1>{datos? 'Convocatoria':'Crear Convocatoria'}</h1>
        {(celebrada && rol === 'gestor') && <button type="button" onClick={()=>navigate(`/nuevo-acta/?id=${datos.id}`)}>Crear Acta</button>}
        {
            (datos && fechaPasada) &&
            <div className="alerta-error" hidden={rol !== 'gestor'}>
                <p>⚠️ Esta convocatoria ya no se puede modificar.</p>
            </div>
        }
        <form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <input
                type="text"
                name="titulo"
                value={titulo}
                disabled={fechaPasada || rol !== 'gestor'}
                onChange={handleChange}
            />

            <label>Tipo</label>
            <select name="tipo" value={tipo} onChange={handleChange} disabled={fechaPasada || rol !== 'gestor'}>
                <option value="ordinaria">Ordinaria</option>
                <option value="extraordinaria">Extraordinaria</option>
            </select>

            <label>Convocatoria</label>
            <select name="num_convocatoria" value={num_convocatoria} onChange={handleChange} disabled={fechaPasada || rol !== 'gestor'}>
                <option value="primera">Primera</option>
                <option value="segunda">Segunda</option>
            </select>

            <label>Lugar</label>
            <input
                type="text"
                name="lugar"
                value={lugar}
                disabled={fechaPasada || rol !== 'gestor'}
                onChange={handleChange}
            />

            <label>Fecha</label>
            <input
                type="date"
                name="fecha"
                value={fecha}
                disabled={fechaPasada || rol !== 'gestor'}
                onChange={handleChange}
            />

            <label>Hora</label>
            <input
                type="time"
                name="hora"
                value={hora}
                disabled={fechaPasada || rol !== 'gestor'}
                onChange={handleChange}
            />
            <small hidden={fechaPasada || rol !== 'gestor'}>*Tiempo de cortesia: 10 min después de la hora.</small>
            <label>Celebrada</label>
            <input
                type="checkbox"
                name="celebrada"
                checked={celebrada}
                disabled={fechaPasada || rol !== 'gestor'}
                onChange={handleCelebradaChange}
            />

            <h2>Puntos del día</h2>
            <ul>
                {
                    puntos.map((punto)=>(
                        <li key={uuid()}>
                            {punto?.descripcion}
                            {(!fechaPasada && rol === 'gestor') && <button type="button" onClick={()=>editarPunto(punto?.descripcion)}>Moficar</button>}
                            {(!fechaPasada && rol === 'gestor') && <button type="button" onClick={()=>eliminarPunto(punto?.descripcion)}>Eliminar</button>}                      
                        </li>
                    ))
                }
            </ul>
            <textarea
                name="punto"
                placeholder="Escribe un punto del día..."
                cols={30}
                rows={2} 
                value={puntoActual}
                hidden={fechaPasada || rol !== 'gestor'}
                onChange={(e)=>setPuntoActual(e.target.value)}

            />
            <button type="button" onClick={agregarPunto} disabled={fechaPasada || rol !== 'gestor'} hidden={rol !== 'gestor'}>Agregar Punto</button>
            <br />
            <button type="submit" disabled={fechaPasada || rol !== 'gestor'} hidden={rol !== 'gestor'}>{datos? 'Modificar':'Crear'}</button>
        </form>        
    </>
  )
}
