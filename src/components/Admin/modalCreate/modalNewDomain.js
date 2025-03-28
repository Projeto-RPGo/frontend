"use client";
import { useState } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalNewDomain({ isOpen, onClose, onDomainCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira um nome para o domínio");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/domain/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({
            domain_id: null,
            name: name.trim(),
            description: description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar domínio");
      }

      onDomainCreated({
        id: data.domain_id,
        name: data.name,
        description: data.description,
      });

      setName("");
      setDescription("");
      setStatus("success");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro na requisição:", error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (status === "error") setStatus("default");
  };

  console.log(name, description, status);

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

        <h2 className="text-xl font-bold mb-6 text-white">
          Criar Novo Domínio
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="domain-name"
              className="block text-sm font-medium text-gray-300"
            >
              Nome do Domínio*
            </label>
            <input
              id="domain-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: Artes Marciais, Poderes Psíquicos"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="domain-description"
              className="block text-sm font-medium text-gray-300"
            >
              Descrição
            </label>
            <textarea
              id="domain-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500 min-h-[100px]"
              placeholder="Descreva as características deste domínio"
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}

          {status === "success" && (
            <p className="text-green-400 text-sm">
              Domínio criado com sucesso!
            </p>
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
