import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRefresh } from "../../redux/thunks";
import { getPropietarios } from "../../services/usuarios";
import { useForm } from "../../hooks/useForm";
import { saveAsistentes } from "../../services/actas";
import { getususcomunicado, sendComunicado } from "../../services/comunicados";


export const NuevoComunicado = () => {
    const {token, is_loading, is_authenticated, rol}=useSelector((state)=>state.auth);
    const {actual}=useSelector((state)=>state.comunidad);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [destinatarios, setDestinatarios]=useState([]);
    const [abierto, setAbierto]=useState(false);
    
    const {form, titulo, texto, comunidad, handleChange, handleReset}=useForm({
        titulo:'',
        texto:'',
        comunidad:actual.id
    });

    useEffect(() => {
        if (!token && !is_loading && !is_authenticated) {
            dispatch(getRefresh(navigate));
            return;
        }

        if (token && !is_loading && is_authenticated) {
            const cargarDatos = async () => {
                const data = await getususcomunicado(actual.id, token);
                if (!data) return; 
                setDestinatarios(data);                    
            };
            cargarDatos();
        }
    }, [token, is_authenticated, is_loading]);

    const manejarCambio = (id, campo, valor) => {
        setDestinatarios(prev => prev.map(destinatario => {
            if (destinatario.id === id) {
                return { 
                    ...destinatario, 
                    [campo]: valor
                };
            }
            return destinatario;
        }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const ok=await sendComunicado(token, {titulo, texto, comunidad, destinatarios});
        if (!ok)return;
        handleReset();
        setAbierto(false);
    }

  return (
    <>
        <h1>Redactar Comunicado</h1>
        <form onSubmit={handleSubmit}>
            <label>Título </label>
            <input
                type="text"
                name="titulo"
                value={titulo}
                onChange={handleChange}
            />

            <label>Mensaje</label>
            <textarea
                name="texto"
                value={texto}
                onChange={handleChange}
                rows={10}
                cols={50}
            />

            <button type="button" onClick={()=>setAbierto(!abierto)}>Elegir Destinatarios</button>
        {
            abierto && destinatarios.map((usuario)=>(
                <div key={usuario?.id}>
                    <input
                        type="checkbox"
                        onChange={(e) => manejarCambio(usuario?.id, 'destinatario', e.target.checked)}
                    />

                    <p>{usuario?.nombre} {usuario?.apellido1} {usuario?.apellido2}</p>
                    <p>{usuario?.dni}</p>
                </div>
            ))            
        }

        <button type="submit">Crear</button>
        </form>        
    </>
  )
}
