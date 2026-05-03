import { useMemo, useState } from "react"
import { BorrarUser, getPropietarios, getUsu } from "../services/usuarios";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { usePaginate } from "../hooks/usePaginate";
import { useNavigate } from "react-router-dom";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Cabecera } from "../components/Cabecera";
import { Titulo } from "../components/Titulo";
import { Paginacion } from "../components/Paginacion";
import { Contenedor } from "../components/Contenedor";
import { Item } from "../components/Item";
import { Formulario } from "../components/Formulario";
import { Input } from "../components/Input";
import { Footer } from "../components/Footer";
import { Btn } from "../components/Btn";


export const PropietarioList = () => {
    const token=useSelector((state)=>state.auth.token);

    const navigate=useNavigate();

    const {dni, handleChange, handleReset}=useForm({
        dni:''
    });

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);
    
    const PropietariosUnicos = useMemo(() => {
        const mapa = new Map(datos.map(item => [item.id, item]));    
        return Array.from(mapa.values());
    }, [datos]);

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);

    const delUser=async(token, id)=>{
        const option=window.confirm('¿Estas seguro de borrar a este propietario?');
        if(!option) return;
        await BorrarUser(token, id);
        const data=await getUsu(token);
        actualizarEstado(data);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(dni);
        const data=await getUsu(token, dni);
        actualizarEstado(data);
        handleReset();
    }
  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Propietarios'}/>
            <Formulario onSubmit={handleSubmit}>
                <Input label={'DNI del propietario a buscar '} value={dni} onChange={handleChange} name={'dni'}/>
                <Btn text={'Buscar'} type={'submit'}/>
                <small>*Si el usuario aún no tiene propiedad asignada también puedes buscarlo por el DNI </small>
            </Formulario>            
            <Contenedor>
                {(datos.length > 0) && 
                    <>
                        <h2 className="text-center text-white text-2xl">Lista propietarios</h2>
                            {
                                PropietariosUnicos.map((usu)=>(
                                    <Item key={usu.id}>
                                        <p><strong>{usu.nombre} {usu.apellido1} {usu.apellido2}</strong></p>                                    
                                        <p>DNI: <strong>{usu.dni}</strong></p>
                                        <p>Telefono: <strong>{usu.telefono}</strong></p>
                                        <p>Email: <strong>{usu.email}</strong></p>
                                        <p>Rol: <strong>{usu.rol_info}</strong></p>
                                        <p><strong>{(usu.moroso_info) && 'Moroso'}</strong></p>
                                        <div className="flex items-center gap-4">
                                            <Btn onClick={()=>navigate(`/nuevo-propietario/?user_dni=${usu.dni}`)} text={'Editar'}/>
                                            <Btn onClick={()=>delUser(token, usu.id)} text={'Eliminar'}/>
                                        </div>
                                    </Item>
                                ))
                            }
                        <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/>                       
                    </>
                }            
            </Contenedor>
            <Footer/>
        </PlantillaGeneral>
    </>
  )
}
