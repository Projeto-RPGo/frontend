"use client";
import { useState, useEffect } from "react";
import { Icon } from "../Icon/icon";
import EditableCharacterCard from "./editableCharacterCard";

export default function AllCharacters({ user }) {
  const [characters, setCharacters] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/characters/user/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar personagens");
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (expanded) {
      fetchCharacters();
    }
  }, [user, expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      <div
        onClick={toggleExpand}
        className="cursor-pointer font-bold text-lg text-red-500 hover:text-red-600 transition-colors flex items-center"
      >
        {user.name}
        <Icon
          id={"expand"}
          height={15}
          width={8}
          className={`ml-2 transition-transform duration-300 ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>

      {expanded && (
        <div className="ml-6 mt-2">
          {loading ? (
            <p className="text-gray-200">Carregando personagens...</p>
          ) : characters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {characters.map((character) => (
                <EditableCharacterCard
                  key={character.character_id}
                  character={character}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhum personagem encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
