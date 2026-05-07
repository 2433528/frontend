import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { sendInfo } from "../../services/info";
import { PlantillaGeneral } from "../../components/PlantillaGeneral";
import { Cabecera } from "../../components/Cabecera";
import { Titulo } from "../../components/Titulo";
import { Formulario } from "../../components/Formulario";
import { Contenedor } from "../../components/Contenedor";
import { Input } from "../../components/Input";
import { Btn } from "../../components/Btn";
import { Footer } from "../../components/Footer";

export const NuevoInfo = () => {
    const user=useSelector((state)=>state.auth.user);
    const token=useSelector((state)=>state.auth.token);
    const comu=useSelector((state)=>state.comunidad.actual);

    const {form,titulo, texto, handleChange, handleReset}=useForm({
        titulo:'',
        texto:'',
        usuario_creador:user.user_id,
        comunidad:comu.id
    });

    const handleClick=(e)=>{
        e.preventDefault();

        const sendFetch = async () => {
                try {
                    sendInfo(token, form);
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
            <Titulo titulo={'Nueva Información'}/>
            <Contenedor>
                <Formulario onSubmit={handleClick}>
                <Input
                    label={'Título'}
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

                <Btn text={'Crear'} type="submit"/>      
            </Formulario>    
            </Contenedor>
            <Footer/>           
        </PlantillaGeneral>
    </>
  )
}
