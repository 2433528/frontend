import React, { useEffect, useState } from 'react'
import { PlantillaGeneral } from '../../components/PlantillaGeneral'
import { Cabecera } from '../../components/Cabecera'
import { Titulo } from '../../components/Titulo'
import { Contenedor } from '../../components/Contenedor'
import { Footer } from '../../components/Footer'
import { Formulario } from '../../components/Formulario'
import { Input } from '../../components/Input'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Btn } from '../../components/Btn'
import { BorrarComunidad, createComunidad, getCom, modificarComunidad, todoComunidades } from '../../services/comunidades'
import { getComunidades } from '../../redux/thunksComunidad'
import { usePaginate } from '../../hooks/usePaginate'
import { Paginacion } from '../../components/Paginacion'
import { Item } from '../../components/Item'
import { Navigate, useNavigate } from 'react-router-dom'

export const NuevoComunidad = () => {
    const token=useSelector((state)=>state.auth.token);
    const navigate=useNavigate();

    const [paginate, setPaginate]=useState({previous:null, next:null});
    const [datos, setDatos]=useState([]);
    const [com, setCom]=useState();

    const actualizarEstado = (data) => {
        setPaginate({ previous: data.previous, next: data.next });
        setDatos(Array.isArray(data.results) ? data.results : []);
    };

    const {getPrevious, getNext}=usePaginate(paginate.previous, paginate.next, token, actualizarEstado);


    const {form, setForm, handleChange, handleReset, nombre, calle, numero, cod_postal, localidad, provincia, cif}=useForm({
        nombre:'',
        calle:'',
        numero:'',
        cod_postal:'',
        localidad:'',
        provincia:'',
        cif:'',
    });

    useEffect(()=>{
        (com) && setForm({
            nombre:com?.nombre || '',
            calle:com?.calle || '',
            numero:com?.numero || '',
            cod_postal:com?.cod_postal || '',
            localidad:com?.localidad || '',
            provincia:com?.provincia || '',
            cif:com?.cif || ''
        })

    }, [com]);

    const volverArriba = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth', // Hace que el desplazamiento sea suave
        });
    };

    const editarComunidad=async(id)=>{
        const data=await getCom(token, id);
        if (!data) return;
        setCom(data);
        volverArriba();
    }

    const limpiarDatos=()=>{
        handleReset();
        setCom(null);
    }

    const delComunidad=async(token, id)=>{
        const option=window.confirm('¿Estas seguro de borrar a esta comunidad?');
        if(!option) return;
        await BorrarComunidad(token, id);
        const data=await todoComunidades(token, cif);
        actualizarEstado(data);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();    
        if (!com){
            await createComunidad(token, {nombre, calle, numero, cod_postal, localidad, provincia, cif});
            handleReset();
            return;
        }

        await modificarComunidad(com?.id, token, form);
        setDatos([]);
        limpiarDatos();
    }

    const handleSubmit2=async(e)=>{
        e.preventDefault();    
        const data=await todoComunidades(token, cif);
        actualizarEstado(data);
        handleReset();
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Comunidades'}/>
            <Contenedor>
                <Formulario onSubmit={handleSubmit}>
                    <h2 className='font-semibold text-2xl col-span-3 text-center text-blue-900'>Crear Comunidad</h2>
                    <Input
                        addStyle={"col-span-2"}
                        label={'Nombre'}
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                    
                    <Input
                        label={'CIF'}
                        type="text"
                        name="cif"
                        value={cif}
                        onChange={handleChange}
                    />

                    <Input
                        addStyle={"col-span-2"}
                        label={'Calle'}
                        type="text"
                        name="calle"
                        value={calle}
                        onChange={handleChange}
                    />

                    <Input                        
                        label={'Número'}
                        type="text"
                        name="numero"
                        value={numero}
                        onChange={handleChange}
                    />

                    <Input
                        label={'Codigo Postal'}
                        type="text"
                        name="cod_postal"
                        value={cod_postal}
                        onChange={handleChange}
                    />

                    <Input
                        label={'Localidad'}
                        type="text"
                        name="localidad"
                        value={localidad}
                        onChange={handleChange}
                    />

                    <Input
                        label={'Provincia'}
                        type="text"
                        name="provincia"
                        value={provincia}
                        onChange={handleChange}
                    />
                    {com ? <Btn text="Modificar" type="submit" addStyle={"col-span-3"}/>:<Btn text="Crear" type="submit" addStyle={"col-span-3"}/>}                    
                </Formulario>
                {com && <Btn text="Limpiar datos" type="button" onClick={limpiarDatos} addStyle={"justify-self-end"}/>}
            </Contenedor>
            <Contenedor>
            <Formulario onSubmit={handleSubmit2}>
                <h2 className='font-semibold text-2xl col-span-3 text-center text-blue-900'>Buscar comunidad</h2>       
                <Input
                addStyle={"col-span-2 sm:col-span-3"}
                label={'CIF'}
                type="text"
                name="cif"
                value={cif}
                onChange={handleChange}
                />          
                <Btn text='Buscar' type="submit" addStyle={"w-full col-start-2 col-end-3"}/>
            </Formulario>
            {  (datos.length > 0)&&
                <>
                    <h2 className="text-center text-blue-900 text-2xl">Lista comunidades</h2>                    
                        {
                            datos.map((item)=>(
                                <Item key={item.id}>
                                    <p>Nombre: <strong>{item.nombre}</strong></p>
                                    <p>CIF: <strong>{item.cif}</strong></p>
                                    <p>Dirección: <strong>{item.calle}, {item.numero}</strong></p>    
                                    <p>Código Postal: <strong>{item.cod_postal}</strong></p>
                                    <p>Localidad: <strong>{item.localidad}</strong></p>
                                    <p>Provincia: <strong>{item.provincia}</strong></p>                                                             
                                    <div className="flex items-center gap-4">
                                        <Btn onClick={()=>editarComunidad(item?.id)} text="Editar"/>
                                        <Btn onClick={()=>delComunidad(token, item.id)} text="Eliminar"/>
                                    </div>
                                </Item>
                            ))
                        }                                     
                    <Paginacion onClick1={getPrevious} onClick2={getNext} disabled1={!paginate.previous} disabled2={!paginate.next}/> 
                </>
            }
            </Contenedor>
            <Footer/>
        </PlantillaGeneral>    
    </>
  )
}
