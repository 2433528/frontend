import { useMemo, useState } from "react"
import { BorrarUser, getPropietarios, getUsu } from "../services/usuarios";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { usePaginate } from "../hooks/usePaginate";
import { useNavigate } from "react-router-dom";


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
        const data=await getUsu(token, dni);
        actualizarEstado(data);
        handleReset();
    }
  return (
    <>
        <h1>Propietarios</h1>
        <form onSubmit={handleSubmit}>
            <label>DNI del propietario a buscar </label>
            <input
            type="text"
            name="dni"
            value={dni}
            onChange={handleChange}
            />
            <button type="submit">Buscar</button>
        </form>
        <small>*Si el usuario aún no tiene propiedad asignada también puedes buscarlo por el DNI </small>
        <div>
            {(datos.length > 0) && 
                <>
                    <h2>Lista propietarios</h2>
                    <ul>
                        {
                            PropietariosUnicos.map((usu)=>(
                                <li key={usu.id}>
                                    <p><strong>Nombre: </strong>{usu.nombre}</p>
                                    <p><strong>Apellidos: </strong>{usu.apellido1} {usu.apellido2}</p>
                                    <p><strong>DNI: </strong>{usu.dni}</p>
                                    <p><strong>Telefono: </strong>{usu.telefono}</p>
                                    <p><strong>Email: </strong>{usu.email}</p>
                                    <p><strong>Rol: </strong>{usu.rol_info}</p>
                                    <p><strong>{(usu.moroso_info) && 'Moroso'}</strong></p>
                                    <button onClick={()=>navigate(`/nuevo-propietario/?user_dni=${usu.dni}`)}>Editar</button>
                                    <button onClick={()=>delUser(token, usu.id)}>Eliminar</button>
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
