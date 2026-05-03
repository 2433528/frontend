
export const Input = ({ label, type = "text", placeholder='', value, onChange=null, name, disabled='false' }) => {
  return (
    <div className="flex flex-col gap-1 font-text my-4">
      {label && (
        <label className="font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   outline-none transition-all placeholder:text-gray-400
                   disabled:cursor-not-allowed"
      />
    </div>
  )
}
