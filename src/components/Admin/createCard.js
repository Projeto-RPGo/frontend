import { Icon } from "@/components/Icon/icon";

export default function CreateCard({ onClick, message }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-md text-white border border-gray-700 gap-6 transition duration-300 ease-in-out hover:bg-gray-700 active:bg-gray-600"
    >
      <Icon id="add" size={24} className="scale-[3.0]" />
      <h3 className="text-xl font-bold text-center">{message}</h3>
    </button>
  );
}
