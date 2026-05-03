
export const Formulario = ({onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white w-full p-5 md:p-10 rounded-lg flex flex-col items-center justify-center text-center my-10 border-2 border-blue-800 z-30">
        {children}
    </form>
  )
}
