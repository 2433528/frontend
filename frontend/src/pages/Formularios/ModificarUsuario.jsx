import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { createUser, getUsu, modificarUser } from "../../services/usuarios";
import { useLocation, useNavigate } from "react-router-dom";
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


export const ModificarUsuario = () => {
    const token=useSelector((state)=>state.auth.token);
    const rol_enComunidad=useSelector((state)=>state.auth.rol);
    const location=useLocation();
    const navigate=useNavigate();
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

        await modificarUser(user?.id, token, form);
        handleReset();
        navigate('/propietarios');        
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Nuevo Propietario'}/>
            <Contenedor onClick={()=>navigate('/inicio')}>
                <Formulario onSubmit={crearPropietario}>                    
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>  
                    <h2 className="text-3xl font-bold self-start col-span-2 sm:col-span-3">Datos del Usuario</h2>
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>

                   
                    <Input
                    addStyle={"col-span-2 sm:col-span-1"}
                    label={'Nombre'}
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                    <Input
                    addStyle={"col-span-2 sm:col-span-1"}
                    label={'Apellido 1'}
                    type="text"
                    name="apellido1"
                    value={apellido1}
                    onChange={handleChange}
                    />                
                    <Input
                    addStyle={"col-span-2 sm:col-span-1"}
                    label={'Apellido 2'}
                    type="text"
                    name="apellido2"
                    value={apellido2}
                    required={false}
                    onChange={handleChange}
                    />                
                    <Input
                    addStyle={"col-span-2 sm:col-span-1"}
                    label={'DNI'}
                    type="text"
                    name="dni"
                    value={dni}
                    onChange={handleChange}
                    />                    
                    <Input
                    addStyle={"col-span-2 sm:col-span-1"}
                    label={'Telefono'}
                    type="text"
                    name="telefono"
                    value={telefono}
                    required={false}
                    onChange={handleChange}
                    />
                    
                    
                    <Input
                    addStyle={"col-span-2 sm:col-span-3"}
                    label={'Email'}
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    />
                    
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>
                    <small className="col-span-3">ℹ️ <strong>Modo lectura</strong>: no se permiten modificaciones.</small>
            </Formulario>            
        </Contenedor>        
        </PlantillaGeneral>
    </>
  )
}
