import { Outlet } from "react-router-dom"
import { PlantillaGeneral } from "../components/PlantillaGeneral"


export const General = () => {
  return (
    <>
        <PlantillaGeneral/>
        <Outlet/>
    </>
  )
}
