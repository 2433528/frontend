import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRefresh } from "../../redux/thunks";
import { getConvocatoria } from "../../services/convocatorias";
import { nuevaActa } from "../../services/actas";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Contenedor } from "../../components/Contenedor";
import { Item } from "../../components/Item";
import { Icono } from "../../components/Icono";
import { Btn } from "../../components/Btn";


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
      <PlantillaGeneral>
        <Cabecera/>
        <Titulo titulo={'Acta'}/>
        <Contenedor>
          <Item>            
            <p className="text-3xl my-4"><strong>{datos?.titulo}</strong></p>
            <p><strong>Fecha: </strong>{datos?.fecha_lectura}</p>
            <p><strong>Hora: </strong>{datos?.hora}</p>
            <p><strong>Lugar: </strong>{datos?.lugar}</p>
            <p><strong>Tipo: </strong>{datos?.tipo}</p>
            <p><strong>Convocatoria: </strong>{datos?.num_convocatoria}</p>
            <p><strong>Creador: </strong>{datos?.creador?.nombre} {datos?.creador?.apellido1} {datos?.creador?.apellido2}</p>
            <hr className="my-4 border-2 border-blue-900 rounded-lg"/>
            <h2 className="text-2xl font-bold text-center">Puntos del día</h2>

            <ul className="bg-blue-300 w-full p-3 rounded-lg">
              {
                ((datos?.lista_puntos)? datos?.lista_puntos:[]).map((punto)=>(
                  <li key={punto.id} className="text-[1rem] flex items-center font-bold my-5">
                    <Icono name={'fiber_manual_record'} className="icon-sm"/>
                    {punto.descripcion}
                  </li>
                ))
              }
            </ul>

            {(!datos?.acta)? <Btn text="Guardar" type="button" onClick={handleSubmit}/>:<Btn text="Ver Actas" type="button" onClick={()=>navigate('/actas')}/>}
          </Item>
        </Contenedor>
      </PlantillaGeneral>
    </>
  )
}
