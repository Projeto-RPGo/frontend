export default function HeaderMenu() {
    return (
      <header className="flex items-center justify-center bg-[#D4A59A] h-20">
        <div className="flex items-center justify-between bg-white hover:bg-gray-100 px-8 py-2 rounded-full shadow-md w-2/3 max-w-4xl">
          <a href="#sobre" className="text-black font-medium text-lg hover:underline">
            Sobre
          </a>
          <a href="#time" className="text-black font-medium text-lg hover:underline">
            Time
          </a>
          <a href="#features" className="text-black font-medium text-lg hover:underline">
            Features
          </a>
        </div>
      </header>
    );
  }
  