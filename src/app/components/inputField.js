function InputField({ type, placeholder, icon }) {
    return (
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 text-white bg-transparent border border-white rounded-full placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    );
  }
  
  export default InputField;
  