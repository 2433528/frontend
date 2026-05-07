import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { sendInci } from "../../services/incidencia";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Formulario } from "../../components/Formulario";
import { Footer } from "../../components/Footer";
import { Contenedor } from "../../components/Contenedor";
import { Input } from "../../components/Input";
import { Btn } from "../../components/Btn";


export const NuevoIncidencia = () => {
  const user=useSelector((state)=>state.auth.user);
    const token=useSelector((state)=>state.auth.token);
    const comu=useSelector((state)=>state.comunidad.actual);

    const {form,titulo, texto, handleChange, handleReset}=useForm({
        titulo:'',
        texto:'',
        comunidad:comu.id
    });

    const handleClick=(e)=>{
        e.preventDefault();

        const sendFetch = async () => {
                try {
                    sendInci(token, form);
                } catch (error) {
                    console.log(error);
                    dispatch(getRefresh(navigate));
                }
            };
        
        sendFetch();
        handleReset();
    }

  return (
    <>
        <PlantillaGeneral>
            <Cabecera/>
            <Titulo titulo={'Nueva Incidencia'}/>  
            <Contenedor>
                <Formulario onSubmit={handleClick}>                
                <Input
                    label={'Titulo'}
                    type="text"
                    name="titulo"
                    value={titulo}
                    onChange={handleChange}
                />
                <label className="font-semibold text-gray-700">Texto</label>
                <textarea className="border border-gray-300 focus:outline-none p-3 h-52 w-full rounded-lg resize-none"
                    name="texto"
                    value={texto}
                    onChange={handleChange}
                    cols={40}
                    rows={10}
                />

                <Btn text="Crear" type="submit"/>      
            </Formulario>         
            </Contenedor>
            <Footer/>          
        </PlantillaGeneral>
    </>
  )
}
