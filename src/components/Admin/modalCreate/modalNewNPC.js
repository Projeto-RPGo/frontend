"use client";
import { useState } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalNewNPC({
  isOpen,
  onClose,
  onNPCCreated = () => {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    title: "",
    affiliation: "",
  });
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira um nome para o NPC");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/npc/`,
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
            title: formData.title.trim(),
            affiliation: formData.affiliation.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            "Erro ao criar NPC. Verifique os dados e tente novamente."
        );
      }

      if (typeof onNPCCreated === "function") {
        onNPCCreated(data);
      }

      setFormData({
        name: "",
        description: "",
        title: "",
        affiliation: "",
      });

      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro na requisição:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status === "error") setStatus("default");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full"
      style={{ margin: 0 }}
    >
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">Criar Novo NPC</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Nome do NPC*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: Gandalf, Aragorn, Legolas"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: O Cinzento, Rei de Gondor"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="affiliation"
              className="block text-sm font-medium text-gray-300"
            >
              Afiliação
            </label>
            <input
              id="affiliation"
              name="affiliation"
              type="text"
              value={formData.affiliation}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: Sociedade do Anel, Guarda da Noite"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500 min-h-[100px]"
              placeholder="Descreva as características deste NPC"
            />
          </div>

          {status === "error" && (
            <div className="p-3 bg-red-900/50 rounded-lg text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="p-3 bg-green-900/50 rounded-lg text-green-300 text-sm">
              NPC criado com sucesso!
            </div>
          )}

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
