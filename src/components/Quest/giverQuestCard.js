"use client";
import { useState, useEffect } from "react";
import getCookie from "@/utils/utils";

export default function GiverQuestCard({ quest, onStatusChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [participantsNames, setParticipantsNames] = useState([]);

  // Busca os nomes dos participantes
  useEffect(() => {
    const fetchParticipantsNames = async () => {
      try {
        const names = await Promise.all(
          quest.participants.map(async (participantId) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${participantId}/`,
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
              return data.name;
            }
            return `Personagem ${participantId}`;
          })
        );
        setParticipantsNames(names);
      } catch (error) {
        console.error("Erro ao buscar nomes dos participantes:", error);
        setParticipantsNames([]);
      }
    };

    if (quest.participants && quest.participants.length > 0) {
      fetchParticipantsNames();
    }
  }, [quest.participants]);

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    setError(null);
    const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quest/${quest.quest_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        onStatusChange(quest.quest_id, newStatus);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            `Erro ao ${
              newStatus === "COMPLETED" ? "finalizar" : "cancelar"
            } a missão`
        );
      }
    } catch (err) {
      setError("Erro na conexão com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  // Determina se a missão está ativa
  const isActive = quest.status === "ACTIVE" || quest.status === "Active";

  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg shadow-md border w-80 ${
        isActive ? "border-green-500/30" : "border-gray-700"
      } flex flex-col gap-3`}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h2
            className={`text-xl font-bold ${
              isActive ? "text-green-400" : "text-gray-400"
            }`}
          >
            {quest.name}
          </h2>
          <span
            className={`text-sm ${
              isActive ? "text-green-300" : "text-gray-500"
            }`}
          >
            {quest.type} • {isActive ? "Ativa" : quest.status}
          </span>
        </div>
        {isActive && (
          <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full">
            Ativa
          </span>
        )}
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-300">{quest.description}</p>

      {/* Participantes */}
      {participantsNames.length > 0 && (
        <div>
          <span className="text-xs text-gray-400">Participantes:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {participantsNames.map((name, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-white px-2 py-1 rounded-md"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Informações da Missão */}
      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
        <div>
          <span className="text-gray-400">Prêmio:</span>
          <span className="text-white ml-1">
            {quest.max_giver_xp} XP/Euros
          </span>
        </div>
        <div>
          <span className="text-gray-400">Nível:</span>
          <span className="text-white ml-1">
            {quest.min_level} ~ {quest.max_level}
          </span>
        </div>
      </div>

      {/* Ações (apenas para missões ativas) */}
      {isActive && (
        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={() => handleStatusChange("COMPLETED")}
            disabled={isLoading}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors disabled:bg-gray-800 disabled:opacity-70 flex-1"
          >
            {isLoading ? "Finalizando..." : "Finalizar"}
          </button>
          <button
            onClick={() => handleStatusChange("CANCELED")}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors disabled:bg-red-800 disabled:opacity-70 flex-1"
          >
            {isLoading ? "Cancelando..." : "Cancelar"}
          </button>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
