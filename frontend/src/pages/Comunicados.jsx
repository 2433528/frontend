import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh,} from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { usePaginate } from "../hooks/usePaginate";
import { changeLeido, getcomunicados} from "../services/comunicados";
import {v4 as uuid} from 'uuid';
import { Cabecera } from "../components/Cabecera";
import { Icono } from "../components/Icono";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Paginacion } from "../components/Paginacion";
import { BtnNuevo } from "../components/BtnNuevo";
import { Checked } from "../components/Checked";
import { Btn } from "../components/Btn";
import { Footer } from "../components/Footer";
import { Titulo } from "../components/Titulo";
import { Contenedor } from "../components/Contenedor";

export const Comunicados = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {abierto}=useSelector((state)=>state.menu);

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
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Comunicados'}/>       
            <Contenedor>
                {(rol === 'gestor') && <BtnNuevo onClick={()=>navigate('/nuevo-comunicado')}/>}                
                {datos.map((com)=>(
                <div key={com?.id} className="bg-white p-5 my-5 rounded-lg">
                    <div className="flex flex-col">
                        <p className="whitespace-nowrap self-end">{com?.fecha_creacion}</p>
                        <h2 className="font-bold m-2">{com?.titulo}</h2>                        
                    </div>
                    <p className="m-2">{com?.texto}</p>
                    {(rol === 'gestor') && <Btn onClick={()=>setAbiertoId(abiertoId === com?.id ? null:com?.id)} text={'Enviado a...'}/>}
                    
                    {
                        (rol !== 'gestor')
                        ?<>
                            <Checked name={'leido'} checked={com?.leido || false} disabled={com?.leido} onChange={(e)=>marcarLeido(e.target.checked, com?.comunicadousuario)} text={'Leido'}/> 
                        </>

                        : ((abiertoId === com?.id && com?.usuarios)? com?.usuarios:[]).map((usu)=>(
                            <div key={uuid()} className="flex flex-col mt-5 border-b-2 border-blue-900 pb-1">
                                <p>{usu?.nombre} {usu?.dni}</p>                                
                                <Checked name={'leido'} checked={usu?.leido} disabled={true} text={'Leido'}/>                               
                            </div>
                        ))
                    }
                </div>
                ))}
                <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>
            </Contenedor>            
        </PlantillaGeneral>
        <Footer/>
    </>
  )
}
