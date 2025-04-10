"use client";
import CreateCard from "@/components/Admin/createCard";
import ModalNewQuest from "@/components/Admin/modalCreate/modalNewQuest";
import LogoutButton from "@/components/Logout/logoutButton";
import CharacterCard from "@/components/Profile/characterCard";
import CreateCharacter from "@/components/Profile/createCharacter";
import GiverQuestCard from "@/components/Quest/giverQuestCard";
import { useAuth } from "@/context/authContext";
import { useEffect, useMemo, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [giverQuests, setGiverQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingQuests, setLoadingQuests] = useState(true);
  const [isModalOpenQuest, setIsModalOpenQuest] = useState(false);

  function getCookie(name) {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return decodeURIComponent(parts.pop().split(";").shift());
    return null;
  }

  useEffect(() => {
    if (!user?.id) return;

    async function fetchCharacters() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/characters/user/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar personagens");
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchGiverQuests() {
      setLoadingQuests(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quest/giver/${user.id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar missões");
        const data = await response.json();
        setGiverQuests(data);
      } catch (error) {
        console.error("Erro ao buscar missões:", error);
      } finally {
        setLoadingQuests(false);
      }
    }

    fetchCharacters();
    fetchGiverQuests();
  }, [user]);

  const activeGiverQuests = useMemo(() => {
    return giverQuests.filter(
      (quest) => quest.status === "ACTIVE" || quest.status === "Active"
    );
  }, [giverQuests]);

  const otherGiverQuests = useMemo(() => {
    return giverQuests.filter(
      (quest) => !(quest.status === "ACTIVE" || quest.status === "Active")
    );
  }, [giverQuests]);

  const handleQuestStatusChange = (questId, newStatus) => {
    setGiverQuests((prev) =>
      prev.map((quest) =>
        quest.quest_id === questId ? { ...quest, status: newStatus } : quest
      )
    );
  };

  const handleQuestCreated = (newQuest) => {
    setGiverQuests((prev) => [...prev, newQuest]);
  };

  if (!user) {
    return <p className="text-white">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Perfil</h1>
        <LogoutButton />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-white">
          <strong>Nome:</strong> {user.name}
        </h3>
        <h3 className="text-white">
          <strong>Username:</strong> {user.username}
        </h3>
        <h3 className="text-white">
          <strong>Email:</strong> {user.email}
        </h3>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Personagens</h2>

      {loading ? (
        <p className="text-white">Carregando personagens...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characters.map((character) => (
            <CharacterCard key={character.character_id} character={character} />
          ))}
          <CreateCharacter />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">Missões Criadas</h2>

        {/* ✅ Modal separado */}
        <ModalNewQuest
          isOpen={isModalOpenQuest}
          onClose={() => setIsModalOpenQuest(false)}
          onQuestCreated={handleQuestCreated}
          giverId={user.id}
        />

        {loadingQuests ? (
          <p className="text-white">Carregando missões...</p>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">
                  Em Andamento
                </h3>
                <span className="text-xs text-gray-400">
                  {activeGiverQuests.length} missões
                </span>
              </div>
              <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="flex gap-4">
                  <CreateCard
                    onClick={() => setIsModalOpenQuest(true)} // ✅ Abrindo modal
                    message="Criar Missão"
                    className="flex-shrink-0 min-w-80"
                  />
                  {activeGiverQuests.map((quest) => (
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

            {otherGiverQuests.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-400">Histórico</h3>
                  <span className="text-xs text-gray-400">
                    {otherGiverQuests.length} missões
                  </span>
                </div>
                <div className="overflow-x-auto pb-4 -mx-2 px-2">
                  <div className="flex gap-4">
                    {otherGiverQuests.map((quest) => (
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

            {giverQuests.length === 0 && (
              <p className="text-gray-400">Nenhuma missão criada ainda.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
