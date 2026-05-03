
export const Item = ({children, hidden=false}) => {
  return (
    <div hidden={hidden} className="bg-white my-5 rounded-lg py-4 px-10 box-border z-20">{children}</div>
  )
}
