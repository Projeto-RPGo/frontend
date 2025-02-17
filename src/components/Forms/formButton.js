export default function FormButton({ children, isValid, onClick, className }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={!isValid}
      className={
        className
          ? className
          : `w-full py-3 rounded-full transition text-white ${
              isValid ? "bg-[#A63F3F] hover:bg-[#8B3232] cursor-pointer" : "cursor-not-allowed bg-[#A63F3F] opacity-50"
            }`
      }
    >
      {children}
    </button>
  );
}
