"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "../Icon/icon";

export default function EditableCharacterCard({ character }) {
  const [xp, setXp] = useState(character.xp);
  const [euros, setEuros] = useState(character.euros);
  const [isEditingXp, setIsEditingXp] = useState(false);
  const [isEditingEuros, setIsEditingEuros] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }


  const handleSaveXp = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.character_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({ xp }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar XP");
      }

      setIsEditingXp(false);
    } catch (error) {
      console.error("Erro ao salvar XP:", error);
    }
  };

  const handleCancelXp = () => {
    setXp(character.xp);
    setIsEditingXp(false);
  };

  const handleSaveEuros = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.character_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({ euros }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar Euros");
      }

      setIsEditingEuros(false);
    } catch (error) {
      console.error("Erro ao salvar Euros:", error);
    }
  };

  const handleCancelEuros = () => {
    setEuros(character.euros);
    setIsEditingEuros(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700">
      {/* Imagem do Personagem */}
      <img
        src={character.avatar}
        alt={character.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      {/* Nome do Personagem */}
      <h3 className="text-xl font-bold">{character.name}</h3>

      {/* Afiliação */}
      <p>
        <strong>Afiliação:</strong> {character.affiliation}
      </p>

      {/* XP (Editável) */}
      <div className="flex items-center mt-2">
        <p>
          <strong>Nível(XP):</strong>
          {isEditingXp ? (
            <input
              type="number"
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              className="ml-2 p-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-[9ch]"
              autoFocus
            />
          ) : (
            ` ${xp}`
          )}
        </p>
        {isEditingXp ? (
          <div className="flex items-center ml-2">
            <button
              onClick={handleSaveXp}
              className="transition-colors transform hover:scale-110 active:scale-95"
            >
              <Icon id="check" height={13} width={18} className="animate-pulse" />
            </button>
            <button
              onClick={handleCancelXp}
              className="ml-2 transform hover:scale-110 active:scale-70"
            >
              <Icon id="close" height={14} width={14} className="animate-pulse scale-95" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingXp(true)}
            className="ml-2 text-gray-400 hover:text-gray-300 transition-colors transform hover:scale-110 active:scale-95"
          >
            <Icon
              id="edit"
              height={18}
              width={18}
              className="hover:rotate-6 transition-transform duration-300 ease-in-out"
            />
          </button>
        )}
      </div>

      {/* Euros (Editável) */}
      <div className="flex items-center mt-2">
        <p>
          <strong>Euros:</strong>
          {isEditingEuros ? (
            <input
              type="number"
              value={euros}
              onChange={(e) => setEuros(Number(e.target.value))}
              className="ml-2 p-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-[9ch]"
              autoFocus
            />
          ) : (
            ` ${euros}`
          )}
        </p>
        {isEditingEuros ? (
          <div className="flex items-center ml-2">
            <button
              onClick={handleSaveEuros}
              className="transition-colors transform hover:scale-110 active:scale-95"
            >
              <Icon id="check" height={13} width={18} className="animate-pulse" />
            </button>
            <button
              onClick={handleCancelEuros}
              className="ml-2 transform hover:scale-110 active:scale-70"
            >
              <Icon id="close" height={14} width={14} className="animate-pulse scale-95" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingEuros(true)}
            className="ml-2 text-gray-400 hover:text-gray-300 transition-colors transform hover:scale-110 active:scale-95"
          >
            <Icon
              id="edit"
              height={18}
              width={18}
              className="hover:rotate-6 transition-transform duration-300 ease-in-out"
            />
          </button>
        )}
      </div>

      {/* Botão de edição do personagem */}
      <div className="flex justify-end">
        <Link
          href={`/profile/character/edit?id=${character.character_id}`}
          className="text-gray-400 hover:text-gray-300 transition-colors transform hover:scale-110 active:scale-95"
        >
          <Icon id="character-edit" height={17} width={19} />
        </Link>
      </div>
    </div>
  );
}
