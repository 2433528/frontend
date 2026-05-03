import { Icono } from "./Icono"


export const Paginacion = ({onClick1, onClick2, disabled1, disabled2}) => {
  return (
    <div className="w-full flex justify-between md:gap-2 md:justify-end mb-10 box-border">
        <button className="bg-linear-to-bl from-blue-200 to-blue-500 text-blue-950 p-2 rounded-md  shadow-black shadow-2xl z-20 hover:bg-none hover:bg-blue-500 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-text" onClick={onClick1} disabled={disabled1}><Icono name={'arrow_left'}/></button>
        <button className="bg-linear-to-bl from-blue-200 to-blue-500 text-blue-950 p-2 rounded-md  shadow-black shadow-2xl z-20 hover:bg-none hover:bg-blue-500 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-text" onClick={onClick2} disabled={disabled2}><Icono name={'arrow_right'}/></button>
    </div>
  )
}
