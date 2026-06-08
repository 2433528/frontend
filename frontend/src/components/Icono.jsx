
export const Icono = ({name, className='', onClick=null}) => {
  return (
    <span className={`material-symbols-outlined ${className} select-none`} onClick={onClick}>
        {name}
    </span>
  )
}
