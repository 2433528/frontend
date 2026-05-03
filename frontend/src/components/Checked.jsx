

export const Checked = ({name, checked=null, disabled=false, onChange=null, text=null}) => {
  return (
    <>
      <div className="flex items-center m-2">
        <input
            className="p-2 appearance-none w-6 h-6 bg-white rounded-full border border-blue-900
                checked:bg-green-600
                cursor-pointer transition-all relative
                after:content-[''] after:absolute after:hidden checked:after:block
                after:left-2.25 after:top-1 after:w-1.5 after:h-3
                after:border-white after:border-r-2 after:border-b-2
                after:rotate-45 disabled:cursor-not-allowed"
            type="checkbox"
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange} 
        />
        {text && <label className="ml-1 font-text">{text}</label>}
      </div>
    </>
  )
}
