"use client";
import InfoText from "@/components/Profile/Perso/infoText";
import { useEffect, useState } from "react";
import DomSkill from "@/components/Skill/domSkill";

export default function PersonagemPage() {
  const [personagem, setPersonagem] = useState(null);
  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const [domsPlayer, setDomsPlayer] = useState([]);

  useEffect(() => {
    async function fetchPersonagem() {
      if (!id) {
        // Mockando os dados caso não haja ID
        const perso = {
          playerId: 1,
          persoId: 1,
          nome: "Oliver Von Fersen",
          idade: 16,
          aparencia:
            "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          raca: "Meio Draconiano",
          afiliaçãoId: "Clero",
          xp: 750,
          euros: 200,
          status: "Vivo",
          patente: "Cavaleiro de Rosa Cruz",
          dominio1: 1,
          dominio2: 2,
        };
        setPersonagem(perso);
        return;
      }

      try {
        const response = await fetch(`/api/personagens/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPersonagem(data);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchPersonagem();
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

  if (!personagem) {
    return (
      <p className="text-white">Carregando informações do personagem...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{personagem.nome}</h1>
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex">
          {/* Seção da imagem */}
          <div className="w-2/5 pr-4">
            <img
              src={personagem.aparencia}
              alt={personagem.nome}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          {/* Seção das informações */}
          <div className="w-3/5">
            <InfoText
              label="Nível"
              value={personagem.xp}
              labelColor="text-red-500"
              valueColor="text-gray-200"
            />
            <InfoText
              label="Euros"
              value={personagem.euros}
              labelColor="text-red-500"
              valueColor="text-gray-200"
            />
            <InfoText label="Afiliação" value={personagem.afiliaçãoId} />
            <InfoText label="Patente" value={personagem.patente} />
            <InfoText
              label="Domínio(s)"
              value={domsPlayer?.map((dom) => dom.nome).join(", ") || "Nenhum"}
            />
            <InfoText label="Raça" value={personagem.raca} />
            <InfoText label="Idade" value={personagem.idade} />
            <InfoText label="Personalidade" value={personagem.personalidade} />
            <InfoText
              label="História de Fundo"
              value={personagem.backgroundHistory}
            />
            <InfoText label="Status" value={personagem.status} />
          </div>
        </div>
        {domsPlayer.map((dom) => (
          <DomSkill key={dom.id} dom={dom} userId={id} />
        ))}
      </div>
    </div>
  );
}
