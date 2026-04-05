import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { sendInfo } from "../../services/info";

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
                    console.log(form);
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
        <div>
            <h1>Nueva informacion</h1>

            <form onSubmit={handleClick}>
                <label>Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    value={titulo}
                    onChange={handleChange}
                />
                <label>Texto</label>
                <textarea
                    name="texto"
                    value={texto}
                    onChange={handleChange}
                    cols={40}
                    rows={10}
                />

                <button type="submit">Crear</button>      
            </form>
        </div>
    </>
  )
}
