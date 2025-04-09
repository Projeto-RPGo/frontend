"use client";
import { useEffect, useState, useMemo } from "react";
import GiverQuestCard from "@/components/Quest/giverQuestCard";
import ModalNewQuest from "@/components/Admin/modalCreate/modalNewQuest";
import CreateCard from "@/components/Admin/createCard";

export default function AdminQuestsPage() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpenQuest, setIsModalOpenQuest] = useState(false);

  useEffect(() => {
    async function fetchQuests() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar missões");
        }

        const data = await response.json();
        setQuests(data);
      } catch (error) {
        console.error("Erro ao buscar missões:", error);
        setError("Falha ao carregar missões: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuests();
  }, []);

  const handleQuestCreated = (newQuest) => {
    setQuests((prevQuests) => [...prevQuests, newQuest]);
  };

  const handleQuestStatusChange = (questId, newStatus) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.quest_id === questId ? { ...quest, status: newStatus } : quest
      )
    );
  };

  const activeQuests = useMemo(() => {
    return quests.filter(
      (quest) => quest.status === "ACTIVE" || quest.status === "Active"
    );
  }, [quests]);

  const completedQuests = useMemo(() => {
    return quests.filter(
      (quest) => quest.status === "COMPLETED" || quest.status === "Completed"
    );
  }, [quests]);

  const canceledQuests = useMemo(() => {
    return quests.filter(
      (quest) => quest.status === "CANCELED" || quest.status === "Canceled"
    );
  }, [quests]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Admin - Missões</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Gerencie todas as missões disponíveis.
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-green-500 rounded-full"></div>
      </div>

      {loading ? (
        <p className="text-white">Carregando missões...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : quests.length === 0 ? (
        <p className="text-gray-400">Nenhuma missão encontrada.</p>
      ) : (
        <>
          {/* Seção de Missões Ativas */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-400">Em Andamento</h3>
              <span className="text-xs text-gray-400">
                {activeQuests.length} missões
              </span>
            </div>
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="flex gap-4">
                <CreateCard
                  onClick={() => setIsModalOpenQuest(true)}
                  message="Criar Missão"
                  className="flex-shrink-0 min-w-[18rem]"
                />
                {activeQuests.map((quest) => (
                  <div
                    key={quest.quest_id}
                    className="flex-shrink-0 min-w-[18rem]"
                  >
                    <GiverQuestCard
                      quest={quest}
                      onStatusChange={handleQuestStatusChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção de Missões Concluídas */}
          {completedQuests.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-400">Concluídas</h3>
                <span className="text-xs text-gray-400">
                  {completedQuests.length} missões
                </span>
              </div>
              <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="flex gap-4">
                  {completedQuests.map((quest) => (
                    <div
                      key={quest.quest_id}
                      className="flex-shrink-0 min-w-[18rem]"
                    >
                      <GiverQuestCard
                        quest={quest}
                        onStatusChange={handleQuestStatusChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seção de Missões Canceladas */}
          {canceledQuests.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-red-400">Canceladas</h3>
                <span className="text-xs text-gray-400">
                  {canceledQuests.length} missões
                </span>
              </div>
              <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="flex gap-4">
                  {canceledQuests.map((quest) => (
                    <div
                      key={quest.quest_id}
                      className="flex-shrink-0 min-w-[18rem]"
                    >
                      <GiverQuestCard
                        quest={quest}
                        onStatusChange={handleQuestStatusChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ModalNewQuest
        isOpen={isModalOpenQuest}
        onClose={() => setIsModalOpenQuest(false)}
        onQuestCreated={handleQuestCreated}
        characters={[]}
      />
    </div>
  );
}
