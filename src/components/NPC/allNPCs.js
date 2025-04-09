"use client";
import { useState, useEffect } from "react";
import { Icon } from "../Icon/icon";
import NPCCard from "./npcCard";

export default function AllNPCs() {
  const [NPCs, setNPCs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNPCs() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/npc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar NPCs");
        const data = await response.json();
        setNPCs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (expanded) {
      fetchNPCs();
    }
  }, [expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      <div
        onClick={toggleExpand}
        className="cursor-pointer font-bold text-lg text-blue-500 hover:text-blue-600 transition-colors flex items-center"
      >
        NPCs
        <Icon
          id={"expand"}
          height={15}
          width={8}
          className={`ml-2 transition-transform duration-300 ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>

      {expanded && (
        <div className="ml-6 mt-2">
          {loading ? (
            <div className="flex justify-center py-4">
              <Icon id="spinner" size={24} className="animate-spin text-gray-400" />
            </div>
          ) : NPCs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {NPCs.map((npc) => (
                <NPCCard key={npc.npc_id} npc={npc} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhum NPC encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}