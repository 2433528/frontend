import React, { useState } from 'react'
import { PlantillaGeneral } from '../../components/PlantillaGeneral'
import { Cabecera } from '../../components/Cabecera'
import { Titulo } from '../../components/Titulo'
import { Contenedor } from '../../components/Contenedor'
import { Formulario } from '../../components/Formulario'
import { Input } from '../../components/Input'
import { Btn } from '../../components/Btn'
import { useForm } from '../../hooks/useForm'
import { Icono } from '../../components/Icono'
import { Footer } from '../../components/Footer'
import { enviarAlBackend } from '../../services/ficheros'
import { useSelector } from 'react-redux'

export const NuevoCSV = () => {

    const {token}=useSelector((state)=>state.auth);

    const [comunidadesFile, setComunidadesFile] = useState(null);
    const [propietariosFile, setPropietariosFile] = useState(null);

    const handleSubmit1=async(e)=>{
        e.preventDefault();
        await enviarAlBackend('comunidades/subir-csv', comunidadesFile, 'archivo', token);
    }

    const handleSubmit2=async(e)=>{
        e.preventDefault();
        await enviarAlBackend('propietarios/subir-csv', propietariosFile, 'archivo', token);
    }


  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Subir ficheros CSV'}/>
            <Contenedor>
                <small>⚠️ Crear primero las comunidades</small>                            
                <Formulario onSubmit={handleSubmit1}>                    
                    <Icono name={'home_work'} className="text-blue-900 icon-md"/>
                    <Input
                        addStyle={"col-span-2 sm:col-start-2 text-blue-900 hover:text-blue-500"}
                        label={'Fichero CSV con comunidades'}
                        type="file"                    
                        name="archivo1"
                        onChange={(e) => setComunidadesFile(e.target.files[0])}
                    />
                    <Btn text={'Enviar'} type="submit" addStyle={"w-full col-start-3"}/>
                    <small className='col-span-3'>ℹ️ Cabecera del fichero: <strong>nombre,calle,numero,cod_postal,localidad,provincia,cif</strong></small>                   
                </Formulario>
                <Formulario onSubmit={handleSubmit2}>
                    <Icono name={'person_edit'} className="text-blue-900 icon-md"/>
                    <Input
                        addStyle={"col-span-2 sm:col-start-2 text-blue-900 hover:text-blue-500"}
                        label={'Fichero CSV con propietarios y sus propiedades'}
                        type="file"
                        name="archivo2"                        
                        onChange={(e) => setPropietariosFile(e.target.files[0])}
                    />
                    <Btn text={'Enviar'} type="submit" addStyle={"w-full col-start-3"}/>
                    <small className='col-span-3'>ℹ️ Cabecera del fichero: <strong>dni,nombre,apellido1,apellido2,telefono,email,num_letra,comunidad_id</strong></small>
                </Formulario>
            </Contenedor>
            <Footer/>
        </PlantillaGeneral>
    </>
  )
}
