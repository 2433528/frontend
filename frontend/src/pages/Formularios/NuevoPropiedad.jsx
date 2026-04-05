import { useSelector } from 'react-redux';
import {useForm} from '../../hooks/useForm'
import { createPropiedad, getProp, modificarPropiedad } from '../../services/propiedad';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

export const NuevoPropiedad = () => {
  const token=useSelector((state)=>state.auth.token);
  const location=useLocation();
  const {prop_id}=queryString.parse(location.search);

  const [prop, setProp]=useState();

  const propiedad =async()=>{
      const data=await getProp(token, prop_id);
      if (!data)return;
      setProp(data);
  }

  useEffect(()=>{
      (prop_id) && propiedad();        
  }, [prop_id]);

const {form, handleChange, handleReset, num_letra, usuario_dni, setForm, comunidad}=useForm({
    num_letra:'',
    usuario_dni:'',
    comunidad:localStorage.getItem('actual')
  });

  useEffect(()=>{
      (prop) &&
      setForm({
          num_letra:prop?.num_letra||'',
          usuario_dni:prop?.dni_usu||'',
          comunidad:localStorage.getItem('actual')
      })
  },[prop]);


  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!prop){      
      await createPropiedad(token, form);
      handleReset();
      return;
    }

    await modificarPropiedad(prop_id, token, form);
    handleReset();
  }

  return (
    <>
        <h1>Nueva Propiedad</h1>
        <form onSubmit={handleSubmit}>
          <label>Numero, piso o letra de la propiedad</label>
          <input
          type="text"
          name="num_letra"
          value={num_letra}
          onChange={handleChange}
          />
          <label>DNI del propietario</label>
          <input
          type="text"
          name="usuario_dni"
          value={usuario_dni}
          onChange={handleChange}
          />
          {(!prop)? <button type="submit">Crear</button>:<button type="submit">Modificar</button>}       
        </form>
        <small>*Para crear la propiedad el propietario debe estar registrado.</small>
    </>
  )
}
