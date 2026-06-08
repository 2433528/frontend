
export const Item = ({children, hidden=false, addStyle=null, onClick=null}) => {
  return (
    <div onClick={onClick} hidden={hidden} className={`bg-white my-5 rounded-lg py-4 px-5 box-border z-20 border-2 border-blue-800 ${addStyle}`}>{children}</div>
  )
}
