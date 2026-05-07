import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { createUser, getUsu, modificarUser } from "../../services/usuarios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Contenedor } from "../../components/Contenedor";
import { Footer } from "../../components/Footer";
import { Formulario } from "../../components/Formulario";
import { Btn } from "../../components/Btn";
import { Input } from "../../components/Input";
import { Checked } from "../../components/Checked";


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
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Nuevo Propietario'}/>
            <Contenedor>
                <Formulario onSubmit={crearPropietario}>
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>  
                    <h2 className="text-3xl font-bold self-start">Datos del Propietario</h2>
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>

                    <Input
                    label={'Contraseña'}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    />
                    <Input
                    label={'Nombre'}
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                    <Input
                    label={'Apellido 1'}
                    type="text"
                    name="apellido1"
                    value={apellido1}
                    onChange={handleChange}
                    />                
                    <Input
                    label={'Apellido 2'}
                    type="text"
                    name="apellido2"
                    value={apellido2}
                    required={false}
                    onChange={handleChange}
                    />                
                    <Input
                    label={'DNI'}
                    type="text"
                    name="dni"
                    value={dni}
                    onChange={handleChange}
                    />
                    <label className="font-semibold text-gray-700">Rol</label>
                    <select name="rol" value={rol} onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none"
                    >
                        <option value="propietario">Propietario</option>
                        <option value="presidente">Presidente</option>                
                        <option value="vicepresidente">Vicepresidente</option>
                        <option value="secretario">Secretario</option>
                    </select>
                    <Input
                    label={'Telefono'}
                    type="text"
                    name="telefono"
                    value={telefono}
                    required={false}
                    onChange={handleChange}
                    />
                    <Input
                    label={'Email'}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    />
                    <Checked
                    text={'Moroso'}              
                    name="moroso"
                    checked={moroso}
                    onChange={handleChange}
                    />
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>
                    {(!user)? <Btn text="Crear" type="submit"/>:<Btn text="Modificar" type="submit"/>}
                    <hr className="my-4 border-2 border-blue-900 rounded-lg w-full"/>
                    <div className="flex flex-col text-start gap-2">
                        <small>*El username sera el DNI.</small>            
                        <small>*El nuevo usuario no se mostrará en la lista hasta que no se le asigne una propiedad.</small>
                    </div>
            </Formulario>            
        </Contenedor>
        <Footer/>
        </PlantillaGeneral>
    </>
  )
}
