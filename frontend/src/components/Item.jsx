
export const Item = ({children, hidden=false}) => {
  return (
    <div hidden={hidden} className="bg-white my-5 rounded-lg py-4 px-5 box-border z-20 border border-blue-800">{children}</div>
  )
}
