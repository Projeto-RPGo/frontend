"use client";
import InfoText from "@/components/Profile/Character/infoText";
import { useEffect, useState } from "react";
import DomSkill from "@/components/Skill/domSkill";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [domsPlayer, setDomsPlayer] = useState([]);
  const [affiliation, setAffiliation] = useState(null);
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

  useEffect(() => {
    async function fetchDomsPlayer() {
      if (!id) return;

      try {
        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/domain/${character.domain1}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/domain/${character.domain2}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response1.ok && response2.ok) {
          const data1 = await response1.json();
          const data2 = await response2.json();
          const formattedData = [
            {
              id: data1.domain_id,
              name: data1.name,
              descricao: data1.description,
            },
            {
              id: data2.domain_id,
              name: data2.name,
              descricao: data2.description,
            },
          ];
          setDomsPlayer(formattedData);
        } else if (response1.ok) {
          const data = await response1.json();
          const formattedData = [
            {
              id: data.domain_id,
              name: data.name,
              descricao: data.description,
            },
          ];
          setDomsPlayer(formattedData);
        } else {
          console.error("Erro ao buscar dominio:", response1.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchDomsPlayer();
  }, [character]);

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
        {domsPlayer.map((dom) => (
          <DomSkill key={dom.id} dom={dom} userId={id} />
        ))}
      </div>
    </div>
  );
}
