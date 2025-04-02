"use client";
import { useEffect, useState } from "react";
import Race from "@/components/Race/race";
import CreateCard from "@/components/Admin/createCard";
import ModalNewRace from "@/components/Admin/modalCreate/modalNewRace";

export default function RacePage() {
  const [allRaces, setAllRaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllRaces() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/race`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar raças");

        const data = await response.json();
        setAllRaces(data);
      } catch (error) {
        console.error("Erro detalhado:", error);
        setError("Falha ao carregar raças: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllRaces();
  }, []);

  const handleRaceCreated = (newRace) => {
    setAllRaces((prevRaces) => [...prevRaces, newRace]);
  };

  if (loading) {
    return <p className="text-gray-200">Carregando raças...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold mb-4">Raças</h1>
        <h2 className="text-lg text-gray-400 mb-6">
          Todas as raças existentes.
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-10/12 h-1 bg-blue-500 rounded-full"></div>
        </div>
        {allRaces.map((race) => (
          <Race
            key={race.id || race.Race_id || `${race.name}-${race.description}`}
            race={race}
          />
        ))}
      </div>
    </div>
  );
}
