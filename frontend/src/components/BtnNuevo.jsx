import React from 'react'
import { Icono } from './Icono'

export const BtnNuevo = ({onClick}) => {
  return (
    <button className="bg-linear-to-bl from-blue-200 to-blue-500 text-blue-950 p-2 rounded-md  shadow-black shadow-2xl z-20 hover:bg-none hover:bg-blue-500 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-text text-2xl" onClick={onClick}><Icono name={'add'}/> Nuevo</button>
  )
}
