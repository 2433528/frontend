import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delInfo, getInfo } from "../services/info";
import { getRefresh } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Cabecera } from "../components/Cabecera";
import { BtnNuevo } from "../components/BtnNuevo";
import { Btn } from "../components/Btn";
import { Titulo } from "../components/Titulo";
import { Contenedor } from "../components/Contenedor";
import { Item } from "../components/Item";
import { Footer } from "../components/Footer";
import { getAvisos, marcarAviso } from "../redux/thunksAvisos";


export const TablonInfo = () => {
    const {token, is_loading, rol, is_authenticated}=useSelector((state)=>state.auth);
    const {avisos_list}=useSelector((state)=>state.avisos);
    const comunidad=useSelector((state)=>state.comunidad.actual);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [datos, setDatos]=useState([]);    

    useEffect(() => {
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
            return;
        }

        if (token && comunidad?.id && !is_loading) {
            const cargarDatos = async () => {
                const data = await getInfo(comunidad.id, token);
                if (!data) return; 
                setDatos(Array.isArray(data) ? data : []);
                await dispatch(getAvisos());
            };
            cargarDatos();             
        }

        return;
    }, [token, comunidad?.id, is_loading]);

    const handleDelete=(id)=>{
        const confirm=window.confirm('¿Eliminar esta informacion de forma permanente?');
        if(!confirm)return;
        const info=datos.filter((inf)=>inf.id !== id);
        setDatos(info);
        delInfo(token, id);
    }

    const incluirEstilo = (id) => {
        return avisos_list.some(aviso => aviso.id_elemento === id)
            ? 'animate-pulse'
            : '';
    };

    const quitarAviso=async(id)=>{
        const aviso=avisos_list.find((aviso)=> aviso.tipo === 'info' && aviso.id_elemento === id);
        if(!aviso?.id)return;
        await dispatch(marcarAviso(aviso.id));
        await dispatch(getAvisos());        
    }

  return (
    <>
        <PlantillaGeneral>
        <Cabecera/>
        <Titulo titulo={'Tablón de Anuncios'}/>
            <Contenedor>
            {(rol === 'gestor' || rol === 'presidente') && <BtnNuevo onClick={()=>navigate('/nuevo-info')}/>}
            {
                datos.map((inf)=>(
                    <Item key={inf.id} addStyle={incluirEstilo(inf.id)} onClick={()=>quitarAviso(inf.id)}>
                        <div className="flex justify-between">
                            <h2 className="font-bold whitespace-nowrap">📌 {inf.titulo}</h2>
                            <p className="whitespace-nowrap">{inf.fecha_bonita}</p>
                        </div>
                        <p className="my-2">{inf.texto}</p>
                        {(rol === 'gestor') && <Btn onClick={()=>handleDelete(inf.id)} text={'Eliminar'}/>}
                    </Item>
                ))
            }
        </Contenedor>
        <Footer/>
        </PlantillaGeneral>
    </>
  )
}
