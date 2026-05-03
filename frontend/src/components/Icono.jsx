
export const Icono = ({name, className=''}) => {
  return (
    <span className={`material-symbols-outlined ${className} select-none`}>
        {name}
    </span>
  )
}
