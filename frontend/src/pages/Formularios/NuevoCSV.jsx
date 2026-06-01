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

    const [filename1, setFilename1]=useState(null);
    const [filename2, setFilename2]=useState(null);

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
                    <p className='col-span-3 sm:-mb-16 font-semibold text-gray-500'>Fichero CSV con comunidades</p>
                    <label className="col-span-3 sm:col-start-2 text-blue-900 hover:text-blue-500 hover:cursor-pointer bg-blue-100 rounded-lg p-3 flex justify-between">
                        Subir archivo

                        <Input
                            addStyle={"hidden"}                            
                            type="file"                    
                            name="archivo1"
                            onChange={(e) =>{
                                const file = e.target.files?.[0];
                                setFilename1(file?.name || "");
                                setComunidadesFile(file);
                            }}
                        />
                        <span className="text-gray-600">
                            {filename1 || "Ningún archivo"}
                        </span>                                  
                    </label>                       
                    <Btn text={'Enviar'} type="submit" addStyle={"w-full col-span-3 sm:col-start-3"}/>
                    <small className='col-span-3 wrap-break-word'>ℹ️ Cabecera del fichero: <strong>nombre,calle,numero,cod_postal,localidad,provincia,cif</strong></small>                   
                </Formulario>
                <Formulario onSubmit={handleSubmit2}>
                    <Icono name={'person_edit'} className="text-blue-900 icon-md"/>
                    <p className='col-span-3 sm:-mb-16 font-semibold text-gray-500'>Fichero CSV con propietarios y sus propiedades</p>
                    <label className="col-span-3 sm:col-start-2 text-blue-900 hover:text-blue-500 hover:cursor-pointer bg-blue-100 rounded-lg p-3 flex justify-between">
                        Subir archivo

                        <Input
                            addStyle={"hidden"}
                            type="file"
                            name="archivo2"                        
                            onChange={(e) =>{
                                const file = e.target.files?.[0];
                                setFilename2(file?.name || "");
                                setPropietariosFile(file);
                            }}
                        />

                        <span className="text-gray-600">
                            {filename2 || "Ningún archivo"}
                        </span>                                  
                    </label>                   
                    <Btn text={'Enviar'} type="submit" addStyle={"w-full col-span-3 sm:col-start-3"}/>            
                    <small className='col-span-3 wrap-break-word'>ℹ️ Cabecera del fichero: <strong>dni,nombre,apellido1,apellido2,telefono,email,num_letra,cif_comunidad</strong></small>                    
                    <small className='col-span-3 wrap-break-word'>ℹ️ Contraseña provisional usuarios creados: <strong>Comunidad12345</strong></small>
                </Formulario>
            </Contenedor>
            <Footer/>
        </PlantillaGeneral>
    </>
  )
}
