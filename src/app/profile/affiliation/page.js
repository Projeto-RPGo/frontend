"use client";
import { useEffect, useState } from "react";
import DomAffiliation from "@/components/Affiliation/domAffiliation";
import ModalNewDomain from "@/components/Admin/modalCreate/modalNewDomain";
import ModalNewAffiliation from "@/components/Admin/modalCreate/modalNewAffiliation";
import CreateCard from "@/components/Admin/createCard";

export default function AffiliationPage() {
  const [allAffiliations, setAllAffiliations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpenDomain, setIsModalOpenDomain] = useState(false);
  const [isModalOpenAffiliation, setIsModalOpenAffiliation] = useState(false);

  useEffect(() => {
    async function fetchAllAffiliations() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/`,
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
        const formattedData = data.map((affiliation) => ({
          id: affiliation.affiliation_id,
          name: affiliation.name,
          description: affiliation.description,
        }));

        setAllAffiliations(formattedData);
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
        {allAffiliations.map((affiliation) => (
          <DomAffiliation key={affiliation.id} affiliation={affiliation} />
        ))}
      </div>
    </div>
  );
}