import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { sendInci } from "../../services/incidencia";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Formulario } from "../../components/Formulario";
import { Footer } from "../../components/Footer";
import { Contenedor } from "../../components/Contenedor";
import { Btn } from "../../components/Btn";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";


export const NuevoIncidencia = () => {
  const user=useSelector((state)=>state.auth.user);
    const token=useSelector((state)=>state.auth.token);
    const comu=useSelector((state)=>state.comunidad.actual);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {form,titulo, texto, handleChange, handleReset}=useForm({
        titulo:'',
        texto:'',
        comunidad:comu.id
    });

    const handleClick=(e)=>{
        e.preventDefault();

        const sendFetch = async () => {
                try {
                    await sendInci(token, form);
                } catch (error) {
                    console.log(error);
                    dispatch(getRefresh(navigate));
                }
            };
        
        sendFetch();
        handleReset();
        navigate('/incidencias');
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Nueva Incidencia'}/>  
            <Contenedor>
                <Formulario onSubmit={handleClick}>                
                <Input
                    addStyle={"col-span-2 sm:col-span-3"}
                    label={'Titulo'}
                    type="text"
                    name="titulo"
                    value={titulo}
                    onChange={handleChange}
                />
                <textarea className="border border-gray-300 focus:outline-none p-3 h-52 w-full rounded-lg resize-none col-span-2 sm:col-span-3"
                    placeholder="Texto..."
                    name="texto"
                    value={texto}
                    onChange={handleChange}
                    cols={40}
                    rows={10}
                />
                
                <div className="flex flex-col items-center col-span-2 sm:col-start-2 sm:col-end-3">
                    <Btn text="Crear" type="submit" addStyle={"w-full"}/> 
                </div>                     
            </Formulario>         
            </Contenedor>        
        </PlantillaGeneral>
    </>
  )
}
