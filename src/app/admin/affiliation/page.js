"use client";
import { useEffect, useState } from "react";
import DomAffiliation from "@/components/Affiliation/domAffiliation";
import CreateCard from "@/components/Admin/createCard";
import ModalNewAffiliation from "@/components/Admin/modalCreate/modalNewAffiliation";

export default function AffiliationPage() {
  const [allAffiliations, setAllAffiliations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpenAffiliation, setIsModalOpenAffiliation] = useState(false);

  useEffect(() => {
    async function fetchAllAffiliations() {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/?expand=leader,subleader`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
  
        if (!response.ok) throw new Error("Erro ao buscar afiliações");
  
        const data = await response.json();
        setAllAffiliations(data);
      } catch (error) {
        console.error("Erro detalhado:", error);
        setError("Falha ao carregar afiliações: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchAllAffiliations();
  }, []);

  const handleAffiliationCreated = (newAffiliation) => {
    setAllAffiliations((prevAffiliations) => [...prevAffiliations, newAffiliation]);
  };

  if (loading) {
    return <p className="text-gray-200">Carregando afiliações...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-bold mb-4">Afiliações</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Todas as afiliações existentes.
      </h2> 
      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-blue-500 rounded-full"></div>
      </div>
        {allAffiliations.map((affiliation) => (
          <DomAffiliation 
            key={affiliation.affiliation_id || affiliation.id} 
            affiliation={affiliation} 
          />
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <CreateCard
          onClick={() => setIsModalOpenAffiliation(true)}
          message="Criar Afiliação"
        />

        <ModalNewAffiliation
          isOpen={isModalOpenAffiliation}
          onClose={() => setIsModalOpenAffiliation(false)}
          onAffiliationCreated={handleAffiliationCreated}
        />
      </div>
    </div>
  );
}