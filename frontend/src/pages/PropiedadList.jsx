import { useState } from "react"
import { BorrarUser, getPropietarios, getUsu } from "../services/usuarios";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { usePaginate } from "../hooks/usePaginate";
import { useNavigate } from "react-router-dom";
import { BorrarPropiedad, getPropiedades } from "../services/propiedad";


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
        <h1>Propiedades</h1>
        <form onSubmit={handleSubmit}>
            <label>Piso y letra </label>
            <input
            type="text"
            name="num_piso"
            value={num_piso}
            onChange={handleChange}
            />
            <button type="submit">Buscar</button>
        </form>        
        <div>
            {(datos.length > 0) && 
                <>
                    <h2>Lista propiedades</h2>
                    <ul>
                        {
                            datos.map((item)=>(
                                <li key={item.id}>
                                    <p><strong>Piso y letra: </strong>{item.num_letra}</p>
                                    <p><strong>Propietario: </strong>{item.nombre_usu} {item.apellido1_usu} {item.apellido2_usu}</p>     
                                    <p><strong>DNI del Propietario: </strong>{item.dni_usu}</p>                                                             
                                    <button onClick={()=>navigate(`/nuevo-propiedad/?prop_id=${item.id}`)}>Editar</button>
                                    <button onClick={()=>delPropiedad(token, item.id)}>Eliminar</button>
                                </li>
                            ))
                        }
                    </ul>
                    <div>
                        {(paginate.previous) && <button onClick={getPrevious}>Anterior</button>}
                        {(paginate.next) && <button onClick={getNext}>Siguiente</button>}
                    </div>
                </>
            }
        </div>
    </>
  )
}