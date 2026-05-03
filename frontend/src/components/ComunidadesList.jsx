import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getComActual } from "../redux/thunksComunidad";
import { asignarRol} from "../redux/auhtSlice";
import { useMemo } from "react";
import { Icono } from "./Icono";

export const ComunidadesList = ({list=[], rol=null}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // Aqui se da el valor de la comunidad elegida el estado global
  const handleClick=(item)=>{
    localStorage.setItem('actual', JSON.stringify(item.comunidad));
    dispatch(getComActual(item.comunidad));
    dispatch(asignarRol({rol:item.rol}));
    navigate('/menu');
  }

  const comunidadesUnicas = useMemo(() => {
    const mapa = new Map(list.map(item => [item.comunidad, item]));    
    return Array.from(mapa.values());
  }, [rol]);

  return (
    <>
        {(rol)? <h2 className="font-text font-bold text-3xl text-blue-900">Comunidades que gestionas</h2>:<h2 className="font-text font-bold text-3xl text-blue-900">Comunidades a las que perteneces</h2> }           
        {
        comunidadesUnicas.map((item)=>(
            <article key={item.id} onClick={()=>handleClick(item)} className={"bg-white border-2 border-blue-600 rounded-lg p-3 mt-5 shadow-2xl shadow-blue-900 flex gap-2 items-center"}>
              <Icono name={"home"} className={"text-blue-900"}/>
              <p className="font-text font-bold">{item.com_name}, {item.com_localidad}</p>
            </article>
        ))
        }
    </>
  )
}
