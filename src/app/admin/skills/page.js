"use client";
import { useEffect, useState } from "react";
import DomSkill from "@/components/Skill/domSkill";
import CreateCard from "@/components/Admin/createCard";

export default function SkillsPage() {
  const [allDoms, setAllDoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllDoms() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/doms");
        if (response.ok) {
          const data = await response.json();
          setAllDoms(data);
        } else {
          throw new Error("Erro ao buscar domínios");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllDoms();
  }, []);

  if (loading) {
    return <p className="text-gray-200">Carregando domínios...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Habilidades Cadastradas</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Explore os dominios, descubra todas as habilidades e construa seu
        próprio caminho!
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-red-500 rounded-full"></div>
      </div>

      <div className="flex flex-col space-y-4">
        {allDoms.map((dom) => (
          <DomSkill key={dom.id} dom={dom} />
        ))}
      </div>

      {/* Botões de criação */}
      <div className="flex space-x-4 mt-6">
        <CreateCard
          route="/admin/skills/createDomain"
          message="Criar Dominio"
        />
        <CreateCard
          route="/admin/skills/createSkill"
          message="Criar Habilidade"
        />
      </div>
    </div>
  );
}
