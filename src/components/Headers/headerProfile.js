import Link from "next/link";

export default function HeaderProfile() {
  return (
    <header className="absolute top-0 flex items-center justify-center h-20 w-full z-10">
      <div className="flex items-center justify-center bg-white hover:bg-gray-100 px-8 py-2 rounded-full shadow-md w-2/3 max-w-4xl">
        <div className="flex justify-around w-full">
          <Link
            href="/profile/skills"
            className="text-black font-medium text-lg hover:underline"
          >
            Habilidades
          </Link>
          <Link
            href="/profile"
            className="text-black font-medium text-lg hover:underline"
          >
            Perfil
          </Link>
        </div>
      </div>
    </header>
  );
}
