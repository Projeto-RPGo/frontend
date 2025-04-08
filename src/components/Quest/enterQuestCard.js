"use client";
import { useState } from "react";
import getCookie from "@/utils/utils";

export default function EnterQuestCard({ quest, characterId, onEnterQuest }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEnterQuest = async () => {
    setIsLoading(true);
    setError(null);
    const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quest/${quest.quest_id}/add-character/${characterId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        onEnterQuest(quest.quest_id);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao entrar na missão");
      }
    } catch (err) {
      setError("Erro na conexão com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4 w-80 flex flex-col gap-3 relative">
      {/* Título e Tipo */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-green-400">{quest.name}</h2>
        <span className="text-lg font-bold text-green-400">{quest.type}</span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-300 mt-1">{quest.description}</p>

      {/* Informações de Premiação e Nível */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-green-400">
            Premiação Máxima:
          </span>
          <span className="text-sm text-white">
            {quest.max_player_xp} XP/Euros
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-green-400">Nível:</span>
          <span className="text-sm text-white">
            {quest.min_level} ~ {quest.max_level}
          </span>
        </div>
      </div>

      {/* Botão de Entrar na Missão */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleEnterQuest}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-green-800 disabled:opacity-70"
        >
          {isLoading ? "Entrando..." : "Entrar na Missão"}
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
