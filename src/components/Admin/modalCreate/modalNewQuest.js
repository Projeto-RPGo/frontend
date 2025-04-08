"use client";
import { useState } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalNewQuest({
  isOpen,
  onClose,
  onQuestCreated = () => {},
  giverId,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    min_level: "",
    max_level: "",
    max_player_xp: "",
    max_giver_xp: "",
    narrations: "",
  });
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira um nome para a Quest.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quest/`,
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
            type: formData.type.trim(),
            min_level: parseInt(formData.min_level),
            max_level: parseInt(formData.max_level),
            max_player_xp: parseInt(formData.max_player_xp),
            max_giver_xp: parseInt(formData.max_giver_xp),
            narrations: parseInt(formData.narrations),
            status: "ACTIVE",
            giver: giverId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Erro ao criar Quest.");
      }

      onQuestCreated(data);

      setFormData({
        name: "",
        description: "",
        type: "",
        min_level: "",
        max_level: "",
        max_player_xp: "",
        max_giver_xp: "",
        narrations: "",
      });

      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">Criar Nova Quest</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Nome*",
              name: "name",
              type: "text",
              placeholder: "Ex: Procurem o Príncipe",
            },
            {
              label: "Descrição",
              name: "description",
              type: "textarea",
              placeholder: "Descreva a missão...",
            },
            {
              label: "Tipo",
              name: "type",
              type: "text",
              placeholder: "Ex: Beta, Main Quest, Side Quest...",
            },
            {
              label: "Narrações",
              name: "narrations",
              type: "number",
              placeholder: "Quantidade de narrações",
            },
            {
              label: "Nível Mínimo",
              name: "min_level",
              type: "number",
              placeholder: "Ex: 100",
            },
            {
              label: "Nível Máximo",
              name: "max_level",
              type: "number",
              placeholder: "Ex: 900",
            },
            {
              label: "Premiação Máximo do Jogador",
              name: "max_player_xp",
              type: "number",
              placeholder: "Ex: 100",
            },
            {
              label: "Premiação Máximo do Giver",
              name: "max_giver_xp",
              type: "number",
              placeholder: "Ex: 150",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div className="space-y-1" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300"
              >
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  placeholder={placeholder}
                  rows={3}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}

          {status === "error" && (
            <div className="p-3 bg-red-900/50 rounded-lg text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="p-3 bg-green-900/50 rounded-lg text-green-300 text-sm">
              Quest criada com sucesso!
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
