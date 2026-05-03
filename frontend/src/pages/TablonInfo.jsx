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


export const TablonInfo = () => {
    const {token, is_loading, rol, is_authenticated}=useSelector((state)=>state.auth);
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

  return (
    <>
        <PlantillaGeneral>
        <Cabecera/>
        <Titulo titulo={'Tablón de Anuncios'}/>
            <Contenedor>
            {(rol === 'gestor') && <BtnNuevo onClick={()=>navigate('/nuevo-info')}/>}
            {
                datos.map((inf)=>(
                    <Item key={inf.id}>
                        <div className="flex justify-between">
                            <h2 className="font-bold m-2">📌 {inf.titulo}</h2>
                            <p>{inf.fecha_creacion}</p>
                        </div>
                        <p className="m-2">{inf.texto}</p>
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
