import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getRefresh } from "../redux/thunks";
import { getConvocatorias } from "../services/convocatorias";
import { usePaginate } from "../hooks/usePaginate";
import { Cabecera } from "../components/Cabecera";
import { Icono } from "../components/Icono";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Titulo } from "../components/Titulo";
import { Paginacion } from "../components/Paginacion";
import { BtnNuevo } from "../components/BtnNuevo";
import { Btn } from "../components/Btn";
import { Footer } from "../components/Footer";
import { Contenedor } from "../components/Contenedor";
import { getAvisos, marcarAviso } from "../redux/thunksAvisos";
import { Item } from "../components/Item";


export const Convocatorias = () => {
    const {token, rol, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {abierto}=useSelector((state)=>state.menu);
    const {avisos_list}=useSelector((state)=>state.avisos);

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);

    const convFetch = async () => {
        if (!token || !comunidad?.id || is_loading) return;

        const data = await getConvocatorias(comunidad, token);

        if (!data) return;
        await dispatch(getAvisos());
        actualizarEstado(data);
    };

    useEffect(()=>{
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));            
        };

        convFetch();
        return;
    }, [comunidad?.id, token, is_loading, is_authenticated]);

    const nuevo=()=>{
        localStorage.removeItem('lista');
        navigate('/nuevo-convocatoria');
    }

    const incluirEstilo = (id) => {
        return avisos_list.some(aviso => aviso.id_elemento === id)
            ? 'animate-pulse'
            : '';
    };

    const quitarAviso=async(id)=>{
        const aviso=avisos_list.find((aviso)=> aviso?.tipo === 'convocatoria' && aviso?.id_elemento === id);
        if(!aviso?.id)return;
        await dispatch(marcarAviso(aviso.id));
        await dispatch(getAvisos());        
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Convocatorias'}/>                      
            <Contenedor>
                {(rol === 'gestor' || rol === 'presidente') && <BtnNuevo onClick={nuevo}/>}
                <section>
                    {
                        datos.map((item)=>(
                                                         
                            <Item key={item.id} addStyle={incluirEstilo(item.id)} onClick={()=>quitarAviso(item.id)}>
                                <div className="flex flex-col">
                                    <p className="whitespace-nowrap self-end">{item?.fecha_lectura}</p> 
                                    <p className="font-bold m-2">🗓️ {item?.titulo}</p>                                                                                               
                                </div>
                                {(item?.celebrada)? <p className="bg-green-600 w-max p-2 rounded-lg m-2"><strong>Celebrada</strong></p>:<p className="bg-gray-300 w-max p-2 rounded-lg m-2"><strong>No Celebrada</strong></p>}
                                <Btn addStyle={"justify-self-end"} onClick={()=> navigate(`/detalle-convocatoria/?id=${item?.id}`)} text={(rol === 'gestor' || rol === 'presidente')? 'Ver detalles o modificar': 'Ver detalles'}/>                        
                            </Item>                                                                                    
                    ))}                                               
                </section>
                <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>
            </Contenedor>                           
            <Footer/>
        </PlantillaGeneral>            
    </>
  )
}
