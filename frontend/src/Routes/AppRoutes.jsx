import {Routes, Route} from 'react-router-dom'
import { Login } from '../pages/Login'
import { Inicio } from '../pages/Inicio'
import { Menu } from '../pages/Menu'

export const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/inicio' element={<Inicio/>}/>
            <Route path='/menu' element={<Menu/>}/>
        </Routes>
    </>
  )
}
