import { useNavigate } from "react-router-dom"


export const BtnMenu = () => {
    const navigate=useNavigate();
  return (
    <>
        <button type="button" onClick={()=>navigate('/menu')}>Menu</button>
    </>
  )
}
