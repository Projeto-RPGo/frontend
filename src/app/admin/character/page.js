"use client";
import InfoText from "@/components/Profile/Character/infoText";
import { useEffect, useState, useMemo } from "react";
import DomSkill from "@/components/Skill/domSkill";
import QuestCard from "@/components/Quest/questCard";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [domsPlayer, setDomsPlayer] = useState([]);
  const [affiliation, setAffiliation] = useState(null);
  const [quests, setQuests] = useState([]);
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
    </div>
  );
}
