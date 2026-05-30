import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getRefresh } from "../redux/thunks";
import { usePaginate } from "../hooks/usePaginate";
import { getActas } from "../services/actas";
import { Cabecera } from "../components/Cabecera";
import { Icono } from "../components/Icono";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Paginacion } from "../components/Paginacion";
import { Btn } from "../components/Btn";
import { Footer } from "../components/Footer";
import { Contenedor } from "../components/Contenedor";
import { Item } from "../components/Item";
import { Titulo } from "../components/Titulo";
import { getAvisos, marcarAviso } from "../redux/thunksAvisos";

export const Actas = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {avisos_list}=useSelector((state)=>state.avisos);

    const {abierto}=useSelector((state)=>state.menu);

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
            await dispatch(getAvisos());

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


    const incluirEstilo = (acta) => {
        return (avisos_list.some(aviso => aviso.id_elemento === acta?.id) && !acta?.resuelta)
            ? 'animate-pulse'
            : '';
    };

    const quitarAviso=async(id)=>{
        const aviso=avisos_list.find((aviso)=> aviso.tipo === 'acta' && aviso.id_elemento === id);
        if(!aviso?.id)return;
        await dispatch(marcarAviso(aviso.id));
        await dispatch(getAvisos());        
    }

    const btnClick=(id)=>{
        quitarAviso();
        navigate(`/detalle-acta/?id=${id}`);
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Actas'}/>
            <Contenedor>                
                {datos.map((acta)=>(
                                        
                <Item key={acta.id} addStyle={incluirEstilo(acta)} onClick={()=>quitarAviso(acta.id)}>
                    <div className="flex flex-col">
                        <p className="whitespace-nowrap self-end">{acta.pertenece_convocatoria?.fecha_lectura}</p>
                        <h2 className="font-bold m-2">{acta.pertenece_convocatoria?.titulo}</h2>
                        {(acta?.resuelta)? <p className="bg-green-600 w-max p-2 rounded-lg m-2"><strong>Resuelta</strong></p>:<p className="bg-gray-300 w-max p-2 rounded-lg m-2"><strong>Pendiente</strong></p>}                           
                    </div>
                    <Btn addStyle={"justify-self-end"} onClick={()=>btnClick(acta.id)} text={'Ver detalles y votación'}/>
                </Item>

                ))}
                <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>               
            </Contenedor>              
        </PlantillaGeneral>
        <Footer/>      
    </>
  )
}
