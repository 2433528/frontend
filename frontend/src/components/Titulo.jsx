
export const Titulo = ({titulo}) => {
  return (
    <div className="w-screen h-24 bg-linear-to-b from-transparent to-blue-50/30 rounded-lg z-40">
      <h1 className="font-extrabold text-3xl md:text-5xl text-blue-800 py-8 text-center box-border">{titulo}</h1>  
    </div>
  )
}
