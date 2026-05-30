import { useSelector } from "react-redux"

export const PlantillaGeneral = ({children}) => {
    const {abierto}=useSelector((state)=>state.menu);
  return (
    <>
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
                ${abierto
                    && "after:opacity-50 after:bg-black after:z-40"                 
                }
                `}>
                    {children}             
            </div>
        }
    </>
  )
}
