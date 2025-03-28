"use client";
import { useEffect, useState } from "react";
import DomSkill from "@/components/Skill/domSkill";
import ModalNewDomain from "@/components/Admin/modalCreate/modalNewDomain";
import ModalNewSkill from "@/components/Admin/modalCreate/modalNewSkill";
import CreateCard from "@/components/Admin/createCard";

export default function SkillsPage() {
  const [allDoms, setAllDoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpenDomain, setIsModalOpenDomain] = useState(false);
  const [isModalOpenSkill, setIsModalOpenSkill] = useState(false);

  useEffect(() => {
    async function fetchAllDoms() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/domain/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar domínios");

        const data = await response.json();
        const formattedData = data.map((domain) => ({
          id: domain.domain_id,
          name: domain.name,
          description: domain.description,
        }));

        setAllDoms(formattedData);
      } catch (error) {
        console.error("Erro detalhado:", error);
        setError("Falha ao carregar domínios: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllDoms();
  }, []);

  const handleDomainCreated = (newDomain) => {
    setAllDoms((prevDoms) => [...prevDoms, newDomain]);
  };

  if (loading) {
    return <p className="text-gray-200">Carregando domínios...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="flex flex-col space-y-4">
        {allDoms.map((dom) => (
          <DomSkill key={dom.id} dom={dom} />
        ))}
      </div>
    </div>
  );
}
