
export const Formulario = ({onSubmit, children}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-5 md:p-10 rounded-lg grid grid-cols-2 sm:grid-cols-3 items-center my-10 border-2 border-blue-800 gap-3 z-30">
        {children}
    </form>
  )
}
