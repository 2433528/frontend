import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRefresh } from "../../redux/thunks";
import { getPropietarios } from "../../services/usuarios";
import { useForm } from "../../hooks/useForm";
import { saveAsistentes } from "../../services/actas";
import { getususcomunicado, sendComunicado } from "../../services/comunicados";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Titulo } from "../../components/Titulo";
import { Cabecera } from "../../components/Cabecera";
import { Formulario } from "../../components/Formulario";
import { Contenedor } from "../../components/Contenedor";
import { Btn } from "../../components/Btn";
import { Footer } from "../../components/Footer";
import { Checked } from "../../components/Checked";
import { Input } from "../../components/Input";

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
        const filtro=destinatarios.filter((item)=>item?.destinatario);      
        const ok=await sendComunicado(token, {titulo, texto, comunidad, 'destinatarios':filtro});
        if (!ok)return;
        handleReset();
        setAbierto(false);
        navigate('/comunicados');        
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
        <Titulo titulo={'Redactadar Comunicado'}/>
        <Contenedor>
            <Formulario onSubmit={handleSubmit}>
                <Input
                    addStyle={"col-span-2 sm:col-span-3"}
                    label={'Título'}
                    type="text"
                    name="titulo"
                    value={titulo}
                    onChange={handleChange}
                />

                <textarea className="border border-gray-300 focus:outline-none p-3 h-52 w-full rounded-lg resize-none col-span-3"
                    placeholder="Mensaje..."
                    name="texto"
                    value={texto}
                    onChange={handleChange}
                    rows={10}
                    cols={50}
                />

                <div className="flex justify-center col-span-2 sm:col-span-3">
                    <Btn text="Elegir destinatarios" type="button" onClick={()=>setAbierto(!abierto)}/>
                </div>
                <div className="flex flex-col justify-center col-span-2 sm:col-span-3 box-border">
                    {
                        abierto && destinatarios.map((usuario)=>(
                            <div key={usuario?.id} className="flex flex-col items-center border border-gray-400 w-full p-2 m-2 rounded-lg">
                                <Checked                            
                                    onChange={(e) => manejarCambio(usuario?.id, 'destinatario', e.target.checked)}
                                />

                                <p>{usuario?.nombre} {usuario?.apellido1} {usuario?.apellido2}</p>
                                <p>{usuario?.dni}</p>
                                <p>Propiedades:<strong>{usuario?.propiedades?.map(propiedad=>` ${propiedad}`)}</strong></p>
                            </div>
                        ))            
                    }
                </div>

            <div className="flex flex-col items-center col-span-2 sm:col-start-2 sm:col-end-3">
                <Btn text="Crear" type="submit" addStyle={"w-full"}/>
            </div>
            </Formulario>
        </Contenedor>
        </PlantillaGeneral>      
    </>
  )
}
