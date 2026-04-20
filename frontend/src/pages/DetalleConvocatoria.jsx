import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { getConvocatoria } from "../services/convocatorias";
import { getRefresh } from "../redux/thunks";
import { NuevoConvocatoria } from "./Formularios/NuevoConvocatoria";

export const DetalleConvocatoria = () => {
    const {token, is_loading, is_authenticated}=useSelector((state)=>state.auth);
    const location=useLocation();
    const {id=''}=queryString.parse(location.search);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [datos, setDatos]=useState({});

    useEffect(() => {
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
        }

        if (token && !is_loading && is_authenticated) {
            const cargarDatos = async () => {
                const data = await getConvocatoria(id, token);
                
                if (!data) return;
                setDatos(data);                
            };
            cargarDatos();
        }
        return;
    }, [token, is_authenticated, is_loading]);

  return (
    <>        
        <NuevoConvocatoria datos={datos}/>
    </>
  )
}
