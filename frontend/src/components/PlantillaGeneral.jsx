import { useSelector } from "react-redux"

export const PlantillaGeneral = ({children}) => {
    const {abierto}=useSelector((state)=>state.menu);
  return (
    <>
        {
            <div className={`
                overflow-x-hidden
                font-text
                bg-[url(./assets/AcuarelaCasitas.png)]
                bg-cover
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
                ${abierto
                    ? "after:opacity-95 after:bg-blue-950 after:z-40" 
                    : "after:opacity-90 after:bg-linear-to-b after:from-blue-500 after:to-blue-900"                    
                }
                `}>
                    {children}
            </div>
        }
    </>
  )
}
