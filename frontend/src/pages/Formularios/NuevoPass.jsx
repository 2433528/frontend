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


export const NuevoPass = () => {
    const {user, token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();   
    const {handleChange, handleReset, password}=useForm({
        password:''
    });    

    const crearPropietario=async(e)=>{
        e.preventDefault();        
        await modificarUser(user?.user_id, token, {password});
        navigate('/inicio');
        handleReset();                 
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Cambio Contraseña'}/>
            <Contenedor>
                <Formulario onSubmit={crearPropietario}>
                    <h2 className="text-3xl font-bold self-start col-span-2 sm:col-span-3">Nueva Contraseña</h2>
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>

                    <Input
                    addStyle={"col-span-2 sm:col-span-3"}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    />
                                                            
                    <hr className="my-2 border-2 border-blue-900 rounded-lg w-full col-span-2 sm:col-span-3"/>
                    <div className="col-span-2 sm:col-start-2 sm:col-end-3 flex justify-center">
                    <Btn addStyle={"W-full"} text="Modificar" type="submit"/>
                    </div>
            </Formulario>            
        </Contenedor>        
        </PlantillaGeneral>
    </>
  )
}
