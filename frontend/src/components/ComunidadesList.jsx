import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getComActual } from "../redux/thunksComunidad";
import { asignarRol} from "../redux/auhtSlice";
import { useEffect, useMemo, useState } from "react";
import { Icono } from "./Icono";
import { cambiarEstado } from "../redux/menuSlice";

export const ComunidadesList = ({rolGestion=[], rolDist=[]}) => {
  const {user_id, gestor_fincas}=useSelector((state)=>state.auth.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [rol, setRol]=useState('');
  const [abrirComunidad, setAbrirComunidad]=useState(
    JSON.parse(localStorage.getItem('key')) || null
  );
  
  const cambiarComunidadAbierta=(key)=>{
    setAbrirComunidad(abrirComunidad !== key? key:null);
  }

  // Aqui se da el valor de la comunidad elegida el estado global
  const handleClick=(item)=>{
    const key=`${item.comunidad}-${item.rol}`
    localStorage.setItem('actual', JSON.stringify(item.comunidad));
    localStorage.setItem('key', JSON.stringify(key));
    dispatch(getComActual(item.comunidad));
    setRol(item.rol);
    dispatch(asignarRol({rol:item.rol}));
    cambiarComunidadAbierta(key);
  }

  const comunidadesUnicas1 = useMemo(() => {
    const mapa = new Map(rolGestion.map(item => [item.comunidad, item]));    
    return Array.from(mapa.values());
  }, [rolGestion]);

  const comunidadesUnicas2 = useMemo(() => {
    const mapa = new Map(rolDist.map(item => [item.comunidad, item]));    
    return Array.from(mapa.values());
  }, [rolDist]);

  return (
    <>
      {comunidadesUnicas1.length > 0 &&         
      <div className="w-full box-border bg-blue-100 ">
        <h2 className={`bg-blue-200 font-text font-semibold items-center flex text-2xl whitespace-nowrap text-blue-900 m-4 shadow-inner shadow-blue-900 rounded-lg p-3 `}><Icono name={'home'}/>Gestión</h2> 
        {
          comunidadesUnicas1.map((item)=>(
              <article key={item.id} onClick={()=>handleClick(item)} className={`text-blue-900 m-2 hover:text-blue-600 hover:cursor-pointer p-2`}>
                <div className="flex items-center justify-between shadow shadow-black/50 rounded-lg p-2">
                  <p className={`font-text font-bold ${abrirComunidad === `${item.comunidad}-${item.rol}` && "text-blue-600"}`}>{item.com_name}, {item.com_localidad}</p>
                  {abrirComunidad !== `${item.comunidad}-${item.rol}` ? <Icono name={'keyboard_arrow_down'}/>:<Icono name={'keyboard_arrow_right'}/>}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    abrirComunidad === `${item.comunidad}-${item.rol}`
                      ? "max-h-96"
                      : "max-h-0"
                  }`}
                >
                  <section className="flex flex-col my-2 gap-1.5 px-5 py-0.5 box-border">
                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/comunicados');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold cursor-pointer flex items-center gap-3 p-2">
                        <Icono name={'campaign'} className="text-blue-900"/>
                        Comunicados
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/convocatorias');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                        <Icono name={'calendar_month'} className="text-blue-900"/>
                        Convocatorias
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/actas');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'docs'} className="text-blue-900"/>
                          Actas
                        </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/incidencias');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                        <Icono name={'person_alert'} className="text-blue-900"/>
                        Incidencias
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/tablon');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'info'} className="text-blue-900"/>
                          Información
                        </article>

                      {(item?.rol === 'gestor' && gestor_fincas) && <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/menu-gestion');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg gap-3 text-blue-900 font-bold flex p-2 items-center cursor-pointer">
                          <Icono name={'add_home_work'} className="text-blue-900"/>
                          Comunidad
                        </article>}
                  </section> 
                </div>              
              </article>
          ))
        }
      </div>
      }

      { comunidadesUnicas2.length > 0 && 
      <div className="w-full box-border bg-blue-800">
        <h2 className={`bg-blue-500 p-3 rounded-lg font-text font-semibold items-center flex text-white m-4 text-2xl whitespace-nowrap shadow-inner shadow-black`}><Icono name={'home'}/>Tus comunidades</h2> 
        {
          comunidadesUnicas2.map((item)=>(
              <article key={item.id} onClick={()=>handleClick(item)} className={`text-white m-2 hover:text-blue-400 hover:cursor-pointer rounded-lg p-2`}>
                <div className="flex items-center justify-between shadow shadow-black/50 rounded-lg p-2 ">
                  <p className={`font-text font-bold ${abrirComunidad === `${item.comunidad}-${item.rol}` && "text-blue-400"}`}>{item.com_name}, {item.com_localidad}</p>
                  {abrirComunidad !== `${item.comunidad}-${item.rol}` ? <Icono name={'keyboard_arrow_down'}/>:<Icono name={'keyboard_arrow_right'}/>}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    abrirComunidad === `${item.comunidad}-${item.rol}`
                      ? "max-h-96"
                      : "max-h-0"
                  }`}
                >
                  <section className="flex flex-col my-2 gap-0.5 px-5 py-5 box-border" onClick={()=>dispatch(cambiarEstado({estado:false}))}>
                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/comunicados');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold cursor-pointer flex items-center gap-3 p-2">
                          <Icono name={'campaign'} className="text-blue-900"/>
                          Comunicados
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/convocatorias');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'calendar_month'} className="text-blue-900"/>
                          Convocatorias
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/actas');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'docs'} className="text-blue-900"/>
                          Actas
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/incidencias');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'person_alert'} className="text-blue-900"/>
                          Incidencias
                      </article>

                      <article onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/tablon');
                        }} className="bg-white hover:bg-blue-300 ring-2 ring-blue-700 rounded-lg text-blue-900 font-bold flex p-2 items-center cursor-pointer gap-3">
                          <Icono name={'info'} className="text-blue-900"/>
                          Información
                      </article>                      
                  </section> 
                </div>              
              </article>
          ))
        }
      </div>
      }
    </>
  )
}
