"use client";
import InfoText from "@/components/Profile/Character/infoText";
import { useEffect, useState } from "react";
import DomSkill from "@/components/Skill/domSkill";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [domsPlayer, setDomsPlayer] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const characterId = params.get("id");
      setId(characterId);
    }
  }, []);

  useEffect(() => {
    async function fetchCharacter() {
      if (!id) return;

      try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCharacter(data);
      } else {
        console.error("Erro ao buscar personagem:", response.statusText);
      }}
      catch {
        console.error("Erro na requisição:", error);
      }
    }

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    async function fetchDomsPlayer() {
      if (!id) return;

      try {
        const domsPlayer = await fetch(`/api/doms?userId=${id}`);
        if (domsPlayer.ok) {
          const data = await domsPlayer.json();
          setDomsPlayer(data);
        } else {
          console.error("Erro ao buscar domínios do jogador");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchDomsPlayer();
  }, [id]);

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
            <InfoText label="Afiliação" value={character.affiliation} />
            <InfoText label="Patente" value={character.rank} />
            <InfoText
              label="Domínio(s)"
              value={domsPlayer?.map((dom) => dom.nome).join(", ") || "Nenhum"}
            />
            <InfoText label="Raça" value={character.race} />
            <InfoText label="Idade" value={character.age} />
            <InfoText label="Personalidade" value={character.personality} />
            <InfoText
              label="História de Fundo"
              value={character.background}
            />
            <InfoText label="Status" value={character.status} />
          </div>
        </div>
        {domsPlayer.map((dom) => (
          <DomSkill key={dom.id} dom={dom} userId={id} />
        ))}
      </div>
    </div>
  );
}
