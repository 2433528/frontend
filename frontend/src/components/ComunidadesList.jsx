import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getComActual } from "../redux/thunksComunidad";
import { asignarRol} from "../redux/auhtSlice";
import { useMemo } from "react";

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
        {(rol)? <h2>Comunidades que gestionas</h2>:<h2>Comunidades a las que perteneces</h2> }           
        {
        comunidadesUnicas.map((item)=>(
            <article key={item.id} onClick={()=>handleClick(item)} style={{border: '2px solid black', margin: '1.5%'}}>
            <p>{item.com_name}</p>
            <p>{item.com_localidad}</p>
            </article>
        ))
        }
    </>
  )
}
