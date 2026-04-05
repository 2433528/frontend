import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { createUser, getUsu, modificarUser } from "../../services/usuarios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";


export const NuevoPropietario = () => {
    const token=useSelector((state)=>state.auth.token);
    const location=useLocation();
    const {user_dni}=queryString.parse(location.search);

    const [user, setUser]=useState();

    const usuario =async()=>{
        const data=await getUsu(token, user_dni);
        if (!data)return;
        setUser(data.results?.[0]);
    }

    useEffect(()=>{
        (user_dni) && usuario();        
    }, [user_dni]);

    useEffect(()=>{
        (user) &&
        setForm({
            password:'',
            nombre:user?.nombre||'',
            apellido1:user?.apellido1||'',
            apellido2:user?.apellido2||'',
            dni:user?.dni||'',
            rol:user?.rol_info||'propietario',
            telefono:user?.telefono||'',
            email:user?.email||'',
            moroso:user?.moroso_info||false,
            comunidad:localStorage.getItem('actual')
        })
    },[user]);

    const {form,handleChange, handleReset, setForm, password, nombre, apellido1, apellido2, dni, rol, telefono, email, moroso, comunidad}=useForm({
        password:'',
        nombre:'',
        apellido1:'',
        apellido2:'',
        dni:'',
        rol:'propietario',
        telefono:'',
        email:'',
        moroso:false,
        comunidad:localStorage.getItem('actual')
    });    

    const crearPropietario=async(e)=>{
        e.preventDefault();
        if (!user){
            await createUser(token, form);
            handleReset();
            return;
        }

        await modificarUser(user.id, token, form);
        handleReset();            
    }

  return (
    <>
        <h1>Nuevo Propietario</h1>
        <form onSubmit={crearPropietario}>
            <label>Contraseña </label>
            <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            />
            <label>Nombre </label>
            <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            />
            <label>Apellido 1 </label>
            <input
            type="text"
            name="apellido1"
            value={apellido1}
            onChange={handleChange}
            />
            <label>Apellido 2 </label>
            <input
            type="text"
            name="apellido2"
            value={apellido2}
            required={false}
            onChange={handleChange}
            />
            <label>DNI </label>
            <input
            type="text"
            name="dni"
            value={dni}
            onChange={handleChange}
            />
            <label>Rol </label>
            <select name="rol" value={rol} onChange={handleChange}>
                <option value="propietario">Propietario</option>
                <option value="presidente">Presidente</option>                
                <option value="vicepresidente">Vicepresidente</option>
                <option value="secretario">Secretario</option>
            </select>
            <label>Telefono </label>
            <input
            type="text"
            name="telefono"
            value={telefono}
            required={false}
            onChange={handleChange}
            />
            <label>Email </label>
            <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            />
            <label>Moroso </label>
            <input
            type="checkbox"
            name="moroso"
            checked={moroso}
            onChange={handleChange}
            />
            {(!user)? <button type="submit">Crear</button>:<button type="submit">Modificar</button>}
        </form>
        <small>*El username sera el DNI.</small>
        <br />
        <small>*El nuevo usuario no se mostrará en la lista hasta que no se le asigne una propiedad.</small>
    </>
  )
}
