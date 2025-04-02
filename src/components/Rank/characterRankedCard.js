import { useState, useEffect } from "react";

export default function CharacterRankedCard({ character, rank }) {
  const [affiliation, setAffiliation] = useState(null);

  useEffect(() => {
    async function fetchAffiliation() {
      if (!character?.affiliation) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/${character.affiliation}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAffiliation(data);
        } else {
          console.error("Erro ao buscar afiliação:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchAffiliation();
  }, [character]);

  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gray-800",
          border: "border-yellow-500/30 border-x-4",
          text: "text-yellow-400",
          crown: "🥇",
        };
      case 2:
        return {
          bg: "bg-gray-800",
          border: "border-gray-400/30 border-x-4",
          text: "text-gray-300",
          crown: "🥈",
        };
      case 3:
        return {
          bg: "bg-gray-800",
          border: "border-amber-700/30 border-x-4",
          text: "text-amber-500",
          crown: "🥉",
        };
      default:
        return {
          bg: "bg-gray-800/50",
          border: "border-gray-600/30",
          text: "text-gray-300",
          crown: `${rank}º`,
        };
    }
  };

  const rankStyle = getRankStyle();

  return (
    <div
      className={`${rankStyle.bg} p-3 rounded-lg shadow-sm ${rankStyle.text} border ${rankStyle.border} transition duration-200 ease-in-out hover:scale-[1.01]`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">{rankStyle.crown}</span>
          <h3 className="text-lg font-medium">{character.name}</h3>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <img
          src={character.avatar}
          alt={character.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-500/50"
        />
        <div className="flex-1 space-y-1">
          <p className="text-sm">
            <span className="font-semibold">Afiliação:</span>{" "}
            {affiliation?.name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">XP:</span> {character.xp}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Euros:</span>
            {character.euros || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
