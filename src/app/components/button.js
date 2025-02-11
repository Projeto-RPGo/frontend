function Button({ label, onClick, variant = "primary" }) {
    const styles =
      variant === "primary"
        ? "text-white bg-[#A63F3F] hover:bg-[#8B3232]"
        : "text-[#A63F3F] bg-white hover:bg-gray-100";
  
    return (
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-full transition ${styles}`}
      >
        {label}
      </button>
    );
  }
  
  export default Button;
  