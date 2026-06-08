
export const Contenedor = ({children, onClick=null}) => {
  return (
    <div onClick={onClick}  className="w-[80%] md:w-1/2 m-10 z-40 flex-1">{children}</div>
  )
}
