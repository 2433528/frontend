import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRefresh } from "../../redux/thunks";
import { getConvocatoria } from "../../services/convocatorias";
import { nuevaActa } from "../../services/actas";


export const NuevoActa = () => {
  const {token, is_loading, is_authenticated}=useSelector((state)=>state.auth);
  const {actual}=useSelector((state)=>state.comunidad);
  const location=useLocation();
  const {id=''}=queryString.parse(location.search);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [datos, setDatos]=useState({});

  useEffect(() => {
      if (!token && !is_loading && !is_authenticated) {
          dispatch(getRefresh(navigate));
          return;
      }

      if (token && !is_loading && is_authenticated) {
          const cargarDatos = async () => {
              const data = await getConvocatoria(id, token);
              
              if (!data) {
                  dispatch(getRefresh(navigate));
              } else {
                  setDatos(data);
                  console.log(data)
              }
          };
          cargarDatos();
      }
  }, [token, is_authenticated, is_loading]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const datosAEnviar={
      convocatoria:datos?.id,
      comunidad:actual?.id,
      usuario_creador:datos?.creador?.id
    }
    await nuevaActa(token, datosAEnviar);
    navigate('/actas');
  }

  return(
    <>
      <h1>Acta</h1>

      <h2>Datos:</h2>
      <p><strong>Titulo: </strong>{datos?.titulo}</p>
      <p><strong>Fecha: </strong>{datos?.fecha_lectura}</p>
      <p><strong>Hora: </strong>{datos?.hora}</p>
      <p><strong>Lugar: </strong>{datos?.lugar}</p>
      <p><strong>Tipo: </strong>{datos?.tipo}</p>
      <p><strong>Convocatoria: </strong>{datos?.num_convocatoria}</p>
      <p><strong>Creador: </strong>{datos?.creador?.nombre} {datos?.creador?.apellido1} {datos?.creador?.apellido2}</p>
      
      <h2>Puntos del día:</h2>

      <ul>
        {
          ((datos?.lista_puntos)? datos?.lista_puntos:[]).map((punto)=>(
            <li key={punto.id}>{punto.descripcion}</li>
          ))
        }
      </ul>

      {(!datos?.acta)? <button type="button" onClick={handleSubmit}>Guardar</button>:<button type="button" onClick={()=>navigate('/actas')}>Ver actas</button>}
    </>
  )
}
