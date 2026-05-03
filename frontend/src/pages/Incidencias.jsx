import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh,} from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { changeInci, delInci, getInci } from "../services/incidencia";
import { usePaginate } from "../hooks/usePaginate";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Titulo } from "../components/Titulo";
import { Cabecera } from "../components/Cabecera";
import { BtnNuevo } from "../components/BtnNuevo";
import { Contenedor } from "../components/Contenedor";
import { Item } from "../components/Item";
import { Paginacion } from "../components/Paginacion";
import { Footer } from "../components/Footer";
import { Btn } from "../components/Btn";

export const Incidencias = () => {
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

    const inciFetch = async () => {
        if (!token || !comunidad?.id || is_loading) return;
        
        const data = await getInci(comunidad.id, token);

        if (!data) return;               
        actualizarEstado(data);
    };

    useEffect(()=>{
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));            
        };

        inciFetch();
        return;
    }, [comunidad?.id, token, is_loading, is_authenticated]);

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
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Incidencias'}/>
            <Contenedor>       
            <BtnNuevo onClick={()=>navigate('/nuevo-inci')}/>
            {
                datos.map((dato)=>(
                    <Item key={dato.id}>
                        <div className="flex justify-between">
                            <h2 className="font-bold">{dato.titulo}</h2>
                            <p>{dato.fecha_creacion}</p>
                        </div>                        
                        <p>Emisor: <span className="font-bold">{dato?.usuario_creador?.nombre} {dato?.usuario_creador?.dni}</span></p>
                        <p>{dato.texto}</p>
                        {
                            (dato.estado !== 'resuelta' && rol === 'gestor')
                            ? 
                                <select className={`${(dato.estado === 'inicio') ? "bg-gray-400":"bg-orange-400"} p-2 mt-5 rounded-lg focus:outline-none`}
                                    name="estado"
                                    value={dato.estado}
                                    onChange={(e)=>cambiarEstado(dato.id, e.target.value)}>
                                    <option className="bg-white" value="inicio">Inicio</option>
                                    <option className="bg-white" value="proceso">Proceso</option>
                                    <option className="bg-white" value="resuelta">Resuelta</option>
                                </select>                               
                            : <p className={`${(dato.estado === 'resuelta')? "bg-green-600":(dato.estado === 'proceso')? "bg-orange-400":"bg-gray-400"} p-2 mt-5 rounded-lg max-w-max`}>{dato.estado}</p>
                        }

                        {
                            (rol === 'gestor') && <Btn onClick={()=>handleDelete(dato.id)} text={'Eliminar'}/>
                        }                  
                    </Item>
                ))
            }
            <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>
            </Contenedor>            
            <Footer/>   
        </PlantillaGeneral>
    </>
  )
}
