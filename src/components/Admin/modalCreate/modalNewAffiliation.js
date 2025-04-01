"use client";
import { useState, useEffect } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalNewAffiliation({
  isOpen,
  onClose,
  onAffiliationCreated = () => {}
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader: null,
    subleader: null
  });
  const [characters, setCharacters] = useState([]); // Agora armazena personagens
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  useEffect(() => {
    if (isOpen) {
      fetchCharacters(); // Busca personagens em vez de usuários
    }
  }, [isOpen]);

  // Busca a lista de personagens
  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/`, // Endpoint para personagens
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar personagens");
      }

      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error("Erro ao carregar personagens:", error);
      setErrorMessage(error.message);
      setStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira um nome para a afiliação");
      return;
    }

    setStatus("loading");

    try {
      // Verifica se líder e sublíder são diferentes (se ambos estiverem definidos)
      if (formData.leader && formData.subleader && formData.leader === formData.subleader) {
        throw new Error("Líder e sublíder não podem ser o mesmo personagem");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim(),
            leader: formData.leader, // ID do personagem líder
            subleader: formData.subleader // ID do personagem sublíder
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 
          data.message || 
          "Erro ao criar afiliação. Verifique os dados e tente novamente."
        );
      }

      // Sucesso - chama a função de callback
      if (typeof onAffiliationCreated === 'function') {
        onAffiliationCreated(data);
      }

      // Reseta o formulário
      setFormData({
        name: "",
        description: "",
        leader: null,
        subleader: null
      });
      
      setStatus("success");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro na requisição:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'leader' || name === 'subleader') 
        ? (value === "" ? null : Number(value))
        : value
    }));
    
    if (status === "error") setStatus("default");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">Criar Nova Afiliação</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nome */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Nome da Afiliação*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: Academia de Heróis, Liga da Justiça"
              required
            />
          </div>

          {/* Campo Descrição */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500 min-h-[100px]"
              placeholder="Descreva as características desta afiliação"
            />
          </div>

          {/* Campo Líder */}
          <div className="space-y-2">
            <label htmlFor="leader" className="block text-sm font-medium text-gray-300">
              Líder (Personagem)
            </label>
            <select
              id="leader"
              name="leader"
              value={formData.leader || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
            >
              <option value="">Nenhum líder</option>
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name} (ID: {character.id})
                </option>
              ))}
            </select>
          </div>

          {/* Campo Sublíder */}
          <div className="space-y-2">
            <label htmlFor="subleader" className="block text-sm font-medium text-gray-300">
              Sublíder (Personagem)
            </label>
            <select
              id="subleader"
              name="subleader"
              value={formData.subleader || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
            >
              <option value="">Nenhum sublíder</option>
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name} (ID: {character.id})
                </option>
              ))}
            </select>
          </div>

          {/* Mensagens de status */}
          {status === "error" && (
            <div className="p-3 bg-red-900/50 rounded-lg text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="p-3 bg-green-900/50 rounded-lg text-green-300 text-sm">
              Afiliação criada com sucesso!
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              disabled={status === "loading"}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {status === "loading" ? (
                <>
                  <Icon id="spinner" size={20} className="animate-spin mr-2" />
                  Criando...
                </>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}