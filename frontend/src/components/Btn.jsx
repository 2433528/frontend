

export const Btn = ({onClick=null, text='', type='button', disabled=false, hidden=false, addStyle=null}) => {
  return (
    <button type={type} disabled={disabled} hidden={hidden} className={`bg-linear-to-bl from-blue-300 to-blue-900 text-white p-2 rounded-md  shadow-black shadow-2xl z-20 hover:bg-none hover:bg-blue-600 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-text font-semibold mb-5 mt-5 justify-center ${addStyle}`} onClick={onClick}>{text}</button>
  )
}
