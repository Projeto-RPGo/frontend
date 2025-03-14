import { Icon } from "@/components/Icon/icon";
import { useRouter } from "next/navigation";

export default function CreateCharacter() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/profile/character/create");
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 gap-8 transition duration-300 ease-in-out hover:bg-gray-700 active:bg-gray-600" // Classes para estilo e transição
    >
      <Icon id="add" size={24} className="scale-[3.0]" />
      <h3 className="text-xl font-bold">Criar Personagem</h3>
    </button>
  );
}
