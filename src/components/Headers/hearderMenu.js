import Link from "next/link";

export default function HeaderMenu() {
    return (
      <header className="absolute top-0 flex items-center justify-center bg-[#D4A59A] h-20 w-full">
        <div className="flex items-center justify-between bg-white hover:bg-gray-100 px-8 py-2 rounded-full shadow-md w-2/3 max-w-4xl">
          <Link href="/sobre" className="text-black font-medium text-lg hover:underline">
            Sobre
          </Link>
          <Link href="/time" className="text-black font-medium text-lg hover:underline">
            Time
          </Link>
          <Link href="/features" className="text-black font-medium text-lg hover:underline">
            Features
          </Link>
        </div>
      </header>
    );
  }
  