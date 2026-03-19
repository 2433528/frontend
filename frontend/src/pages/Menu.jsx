import { useSelector } from "react-redux"
import { BtnSalir } from "../components/BtnSalir";


export const Menu = () => {
    const rol=useSelector((state)=>state.auth.user.rol);
  return (
    <>
        <div>
            <div>
                <section>
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Comunicados</article>
                    {(rol === 'gestor') && <article style={{border: '2px solid black' , margin: '1.5%'}}>Gestion Propietarios</article>}
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Actas</article>
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Incidencias</article>
                    <article style={{border: '2px solid black', margin: '1.5%'}}>Informacion</article>
                </section>
            </div>
            <BtnSalir/>
        </div>
    
    </>
  )
}
