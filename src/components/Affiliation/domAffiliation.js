"use client";
import { useState, useEffect } from "react";
import { Icon } from "../Icon/icon";

export default function DomAffiliation({ affiliation }) {
  const [leaderName, setLeaderName] = useState('');
  const [subleaderName, setSubleaderName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNPCNames = async () => {
      setLoading(true);
      try {
        if (affiliation.leader && affiliation.leader !== 0) {
          const leaderResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/npc/${affiliation.leader}`
          );
          if (leaderResponse.ok) {
            const leaderData = await leaderResponse.json();
            setLeaderName(leaderData.name);
          }
        }

        if (affiliation.subleader && affiliation.subleader !== 0) {
          const subleaderResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/npc/${affiliation.subleader}`
          );
          if (subleaderResponse.ok) {
            const subleaderData = await subleaderResponse.json();
            setSubleaderName(subleaderData.name);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar nomes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNPCNames();
  }, [affiliation.leader, affiliation.subleader]);

  if (loading) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
        <div className="font-bold text-lg text-blue-500">{affiliation.name}</div>
        <p className="text-gray-400 text-sm">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      {/* Título da Afiliação */}
      <div className="font-bold text-lg text-blue-500">
        {affiliation.name}
      </div>

      {/* Líder e Sublíder - Versão discreta */}
      <div className="flex flex-wrap gap-3 mt-1 text-sm">
        {leaderName && (
          <div className="flex items-center text-gray-200">
            <Icon id="user" size={14} className="mr-1 text-yellow-400" />
            <span className="font-medium">Líder:</span>
            <span className="ml-1 text-yellow-100">{leaderName}</span>
          </div>
        )}
        {subleaderName && (
          <div className="flex items-center text-gray-200">
            <Icon id="user" size={14} className="mr-1 text-blue-400" />
            <span className="font-medium">Sublíder:</span>
            <span className="ml-1 text-blue-100">{subleaderName}</span>
          </div>
        )}
      </div>

      {/* Descrição da Afiliação */}
      {affiliation.description && (
        <p className="text-sm text-gray-300 mt-2">
          {affiliation.description}
        </p>
      )}
    </div>
  );
}