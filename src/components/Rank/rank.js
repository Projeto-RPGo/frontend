import { useEffect, useState } from "react";
import CharacterRankedCard from "./characterRankedCard";

export default function Rank() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/characters`,
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

        const sortedCharacters = data.sort((a, b) => b.xp - a.xp);
        setCharacters(sortedCharacters);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-200 text-xl">Carregando personagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6 text-left">
        Ranking de Personagens
      </h1>

      {/* Pódio */}
      <div className="flex flex-col items-center mb-8">
        {/* 1º lugar (topo) */}
        {characters.length > 0 && (
          <div className="mb-4 w-full max-w-md">
            <CharacterRankedCard character={characters[0]} rank={1} />
          </div>
        )}

        {/* 2º e 3º lugares (base) */}
        <div className="flex gap-6 w-full justify-center">
          {characters.length > 1 && (
            <div className="w-full max-w-sm">
              <CharacterRankedCard character={characters[1]} rank={2} />
            </div>
          )}
          {characters.length > 2 && (
            <div className="w-full max-w-sm">
              <CharacterRankedCard character={characters[2]} rank={3} />
            </div>
          )}
        </div>
      </div>

      {/* Restante do ranking com scroll */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 max-h-96 overflow-y-auto">
        <h2 className="text-lg font-medium mb-4 text-left">
          Ranking Restante
        </h2>
        <div className="space-y-3">
          {characters.slice(3).map((character, index) => (
            <CharacterRankedCard
              key={character.character_id}
              character={character}
              rank={index + 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
