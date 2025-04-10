"use client";
import InfoText from "@/components/Profile/Character/infoText";
import { useEffect, useState, useMemo } from "react";
import DomSkill from "@/components/Skill/domSkill";
import QuestCard from "@/components/Quest/questCard";
import EnterQuestCard from "@/components/Quest/enterQuestCard";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [domsPlayer, setDomsPlayer] = useState([]);
  const [affiliation, setAffiliation] = useState(null);
  const [quests, setQuests] = useState([]);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [showAvailableQuests, setShowAvailableQuests] = useState(false);
  const [id, setId] = useState(null);

  // Captura o ID da URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const characterId = params.get("id");
      setId(characterId);
    }
  }, []);

  // Busca dados do personagem
  useEffect(() => {
    async function fetchCharacter() {
      if (!id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}/`,
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
          setCharacter(data);
        } else {
          console.error("Erro ao buscar personagem:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchCharacter();
  }, [id]);

  // Busca domínios do personagem
  useEffect(() => {
    async function fetchDomsPlayer() {
      if (!character || !character.domain1) return;

      try {
        const urls = [
          `${process.env.NEXT_PUBLIC_API_URL}/api/domain/${character.domain1}/`,
        ];
        if (character.domain2 && character.domain2 !== character.domain1) {
          urls.push(
            `${process.env.NEXT_PUBLIC_API_URL}/api/domain/${character.domain2}/`
          );
        }

        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            })
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));

        const formattedData = data.map((dom) => ({
          id: dom.domain_id,
          name: dom.name,
          descricao: dom.description,
        }));

        setDomsPlayer(formattedData);
      } catch (error) {
        console.error("Erro ao buscar domínios:", error);
      }
    }

    fetchDomsPlayer();
  }, [character]);

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

  // Busca as missões do personagem
  useEffect(() => {
    async function fetchQuests() {
      if (!id) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quest/character/${id}/`,
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
          setQuests(data);
        } else {
          console.error("Erro ao buscar missões:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchQuests();
  }, [id, character]);

  const fetchAvailableQuests = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quest/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const allQuests = await response.json();

        // Filtrar as missões disponíveis
        const filteredQuests = allQuests.filter((quest) => {
          // Verifica se o nível do personagem está dentro do intervalo da missão
          const levelMatch =
            character.xp >= quest.min_level && character.xp <= quest.max_level;

          // Verifica se o personagem não é o doador da missão
          const notGiver = quest.giver !== character.user_id;

          // Verifica se o personagem já não está participando desta missão
          const notParticipating = !quests.some(
            (q) => q.quest_id === quest.quest_id
          );

          const isActive =
            quest.status === "ACTIVE" || quest.status === "Active";

          return levelMatch && notGiver && notParticipating && isActive;
        });

        setAvailableQuests(filteredQuests);
        setShowAvailableQuests(true);
      } else {
        console.error(
          "Erro ao buscar missões disponíveis:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
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

  const handleEnterQuest = (questId) => {
    // Remove da lista de disponíveis
    setAvailableQuests((prev) => prev.filter((q) => q.quest_id !== questId));

    // Adiciona à lista geral de quests (que irá atualizar activeQuests automaticamente via useMemo)
    const enteredQuest = availableQuests.find((q) => q.quest_id === questId);
    if (enteredQuest) {
      setQuests((prev) => [...prev, { ...enteredQuest, status: "ACTIVE" }]);
    }
  };

  if (!id || !character) {
    return (
      <p className="text-white">Carregando informações do Personagem...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex">
          {/* Seção da imagem */}
          <div className="w-2/5 pr-4">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Seção das informações */}
          <div className="w-3/5">
            <InfoText
              label="Nível"
              value={character.xp}
              labelColor="text-red-500"
              valueColor="text-gray-200"
            />
            <InfoText
              label="Euros"
              value={character.euros}
              labelColor="text-red-500"
              valueColor="text-gray-200"
            />
            <InfoText label="Afiliação" value={affiliation?.name} />
            <InfoText label="Patente" value={character.rank} />
            <InfoText
              label="Domínio(s)"
              value={domsPlayer?.map((dom) => dom.name).join(", ") || "Nenhum"}
            />
            <InfoText label="Raça" value={character.race} />
            <InfoText label="Idade" value={character.age} />
            <InfoText label="Personalidade" value={character.personality} />
            <InfoText label="História de Fundo" value={character.background} />
            <InfoText label="Status" value={character.status} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6 mt-6">
        <div className="w-10/12 h-1 bg-red-500 rounded-full"></div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Sua árvore de habilidades</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Aumente-a ate se tornar uma densa floresta!
      </h2>

      {/* Domínios renderizados */}
      {domsPlayer.map((dom) => (
        <DomSkill key={dom.id} dom={dom} userId={id} />
      ))}

      <div className="flex justify-center mb-6 mt-6">
        <div className="w-10/12 h-1 bg-green-500 rounded-full"></div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Missões e mais missões</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        A verdadeira forma de se divertir e ficar mais forte!
      </h2>
      {activeQuests.length > 0 && (
        <div>
          <h1 className="text-xl font-bold mb-4 text-green-200">
            Em Andamento
          </h1>
          <div className="flex gap-4">
            {activeQuests.map((quest) => (
              <QuestCard key={quest.quest_id} quest={quest} />
            ))}
          </div>
        </div>
      )}
      {completedQuests.length > 0 && (
        <div>
          <h1 className="text-xl font-bold mb-4 text-gray-200">Concluídas</h1>
          <div className="flex gap-4">
            {completedQuests.map((quest) => (
              <QuestCard key={quest.quest_id} quest={quest} />
            ))}
          </div>
        </div>
      )}
      {canceledQuests.length > 0 && (
        <div>
          <h1 className="text-xl font-bold mb-4 text-red-200">Canceladas</h1>
          <div className="flex gap-4">
            {canceledQuests.map((quest) => (
              <QuestCard key={quest.quest_id} quest={quest} />
            ))}
          </div>
        </div>
      )}
      {quests.length === 0 && (
        <p className="text-gray-200">Nenhuma missão encontrada.</p>
      )}
      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchAvailableQuests}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Buscar Novas Missões
        </button>
      </div>

      {/* Seção de missões disponíveis */}
      {showAvailableQuests && (
        <div className="mt-8">
          <h1 className="text-xl font-bold mb-4 text-yellow-200">
            Missões Disponíveis
          </h1>
          {availableQuests.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {availableQuests.map((quest) => (
                <EnterQuestCard
                  key={quest.quest_id}
                  quest={quest}
                  characterId={id}
                  onEnterQuest={handleEnterQuest}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Nenhuma missão disponível no momento.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
