const TextInput = ({label, placeholder, className, value, setValue, labelClassName}) => {
    return(
        <div className={`textInputDiv flex flex-col space-y-z w-full ${className}`}>
            {/*<label htmlFor={label} className={`font-semibold ${labelClassName}`}></label>*/}
            <label htmlFor={label} className="text-xl font-semibold text-black">{label}</label>
    <input 
        type="text" 
        placeholder={placeholder} 
        className="p-3 border mt-2 border-gray-300 border-solid rounded placeholder-gray-500" 
        id={label}
        value={value}
        onChange={(e) => {
            setValue(e.target.value);
        }}
    />
    </div>
    )
    
};
export default TextInput;