import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComunidad } from "../redux/thunksComunidad";
import { BtnSalir } from "../components/BtnSalir";
import { obtenerComunidad } from "../redux/comunidadSlice";
import { useNavigate } from "react-router-dom";


export const Inicio = () => {
  const id_user=useSelector((state)=>state.auth.user.user_id)
  const rol=useSelector((state)=>state.auth.user.rol)
  const comunidades=useSelector((state)=>state.comunidad.comunidad_list);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [list, setList]=useState([]);

  useEffect(()=>{
    (id_user !== '')
    && dispatch(getComunidad(id_user))
  }, []);

  useEffect(()=>{
    (id_user !== '' && comunidades.length > 0)? setList(comunidades): setList([]);
  }, [comunidades]);

  const handleClick=(comunidad)=>{
    dispatch(obtenerComunidad(comunidad));
    navigate('/menu');
  }

  return (
    <>
      <div>
        <div>
          <section>
            <h1>{(rol == 'gestor')? 'Comunidades que administras':'Comunidades a las que perteneces'}</h1>
          {
            (list || list.length > 0) &&

            list.map((com)=>(
              <article key={com.id} onClick={()=>handleClick(com)} style={{border: '2px solid black', margin: '1.5%'}}>
                <p>{com.nombre}</p>
                <p>{com.localidad}</p>
              </article>
            ))
          }
        </section>
        <BtnSalir/>
        </div>
      </div>
    </>
  )
}
