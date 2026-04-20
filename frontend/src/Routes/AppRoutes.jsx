import {Routes, Route} from 'react-router-dom'
import { Login } from '../pages/Login'
import { Inicio } from '../pages/Inicio'
import { Menu } from '../pages/Menu'
import { TablonInfo } from '../pages/TablonInfo'
import { NuevoInfo } from '../pages/Formularios/NuevoInfo'
import { Incidencias } from '../pages/Incidencias'
import { NuevoIncidencia } from '../pages/Formularios/NuevoIncidencia'
import { SubMenuGestion } from '../pages/SubMenuGestion'
import { NuevoPropietario } from '../pages/Formularios/NuevoPropietario'
import { NuevoPropiedad } from '../pages/Formularios/NuevoPropiedad'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PropietarioList } from '../pages/PropietarioList'
import { PropiedadList } from '../pages/PropiedadList'
import { NuevoConvocatoria } from '../pages/Formularios/NuevoConvocatoria'
import { Convocatorias } from '../pages/Convocatorias'
import { DetalleConvocatoria } from '../pages/DetalleConvocatoria'
import { Actas } from '../pages/Actas'
import { NuevoActa } from '../pages/Formularios/NuevoActa'
import { DetalleActa } from '../pages/DetalleActa'
import { Comunicados } from '../pages/Comunicados'
import { NuevoComunicado } from '../pages/Formularios/NuevoComunicado'

export const AppRoutes = () => {  
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/inicio' element={<Inicio/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/tablon' element={<TablonInfo/>}/>
            <Route path='/nuevo-info' element={<NuevoInfo/>}/>
            <Route path='/incidencias' element={<Incidencias/>}/>
            <Route path='/nuevo-inci' element={<NuevoIncidencia/>}/>
            <Route path='/convocatorias' element={<Convocatorias/>}/>
            <Route path='/detalle-convocatoria' element={<DetalleConvocatoria/>}/>
            <Route path='/actas' element={<Actas/>}/>
            <Route path='/detalle-acta' element={<DetalleActa/>}/>
            <Route path='/comunicados' element={<Comunicados/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/menu-gestion' element={<SubMenuGestion/>}/>
              <Route path='/nuevo-propietario' element={<NuevoPropietario/>}/>
              <Route path='/nuevo-propiedad' element={<NuevoPropiedad/>}/>
              <Route path='/propietarios' element={<PropietarioList/>}/>
              <Route path='/propiedades' element={<PropiedadList/>}/>
              <Route path='/nuevo-convocatoria' element={<NuevoConvocatoria/>}/>
              <Route path='/nuevo-comunicado' element={<NuevoComunicado/>}/>
              <Route path='/nuevo-acta' element={<NuevoActa/>}/>          
            </Route>
            
        </Routes>
    </>
  )
}
