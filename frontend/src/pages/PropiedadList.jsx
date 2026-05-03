import { useState } from "react"
import { BorrarUser, getPropietarios, getUsu } from "../services/usuarios";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { usePaginate } from "../hooks/usePaginate";
import { useNavigate } from "react-router-dom";
import { BorrarPropiedad, getPropiedades } from "../services/propiedad";
import { PlantillaGeneral } from "../components/PlantillaGeneral";
import { Titulo } from "../components/Titulo";
import { Cabecera } from "../components/Cabecera";
import { Footer } from "../components/Footer";
import { Formulario } from "../components/Formulario";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import { Paginacion } from "../components/Paginacion";
import { Item } from "../components/Item";
import { Contenedor } from "../components/Contenedor";


export const PropiedadList = () => {
    const token=useSelector((state)=>state.auth.token);

    const navigate=useNavigate();

    const {num_piso, handleChange, handleReset}=useForm({
        num_piso:''
    });

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);

    const delPropiedad=async(token, id)=>{
        const option=window.confirm('¿Estas seguro de borrar a esta propiedad?');
        if(!option) return;
        await BorrarPropiedad(token, id);
        const data=await getPropiedades(token);
        actualizarEstado(data);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data=await getPropiedades(token, num_piso);
        actualizarEstado(data);
        handleReset();
    }
  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Propiedades'}/>
            <Formulario onSubmit={handleSubmit}>
                <Input label={'Piso y letra'} value={num_piso} onChange={handleChange} name={'num_piso'}/>
                <Btn text={'Buscar'} type={'submit'}/>
            </Formulario>  
            <Contenedor>
                {(datos.length > 0) && 
                    <>
                        <h2 className="text-center text-white text-2xl">Lista propiedades</h2>                    
                            {
                                datos.map((item)=>(
                                    <Item key={item.id}>
                                        <p>Piso y letra: <strong>{item.num_letra}</strong></p>
                                        <p>Propietario: <strong>{item.nombre_usu} {item.apellido1_usu} {item.apellido2_usu}</strong></p>     
                                        <p>DNI del Propietario: <strong>{item.dni_usu}</strong></p>                                                             
                                        <div className="flex items-center gap-4">
                                            <Btn onClick={()=>navigate(`/nuevo-propiedad/?prop_id=${item.id}`)} text="Editar"/>
                                            <Btn onClick={()=>delPropiedad(token, item.id)} text="Eliminar"/>
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