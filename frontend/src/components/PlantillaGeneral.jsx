import { useSelector } from "react-redux"
import { Sidebar } from "./Sidebar";
import { Cabecera } from "./Cabecera";
import { Footer } from "./Footer";

export const PlantillaGeneral = ({children}) => {
    const {abierto, personal}=useSelector((state)=>state.menu);
  return (
    <>
        <div className="flex">
            <div className="max-w-full hidden md:flex md:flex-1">
                <Sidebar/>
            </div>
            {
            <div className={`
                overflow-x-hidden
                font-text
                min-h-screen
                w-full
                relative                
                flex
                flex-col
                items-center
                after:absolute
                after:content-['']           
                after:z-2
                after:w-full
                after:h-full
                after:pointer-events-none
                ${(abierto || personal )
                    && "after:opacity-50 after:bg-black after:z-40"                 
                }
                `}>
                    {children}             
            </div>
            }            
        </div>
        <Footer/>
    </>
  )
}
