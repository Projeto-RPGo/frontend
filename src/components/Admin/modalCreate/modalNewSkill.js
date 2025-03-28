"use client";
import { useState } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalNewSkill({ isOpen, onClose, domains }) {
  const [name, setName] = useState("");
  const [slot1, setSlot1] = useState("");
  const [slot2, setSlot2] = useState("");
  const [slot3, setSlot3] = useState("");
  const [slot4, setSlot4] = useState("");
  const [slot5, setSlot5] = useState("");
  const [domain1, setDomain1] = useState("");
  const [domain2, setDomain2] = useState("");
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira um nome para a habilidade");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/skill/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            slot1: slot1.trim(),
            slot2: slot2.trim(),
            slot3: slot3.trim(),
            slot4: slot4.trim(),
            slot5: slot5.trim(),
            domain1: domain1 ? Number(domain1) : null,
            domain2: domain2 ? Number(domain2) : null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar habilidade");
      }

      resetForm();
      setStatus("success");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro na requisição:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setSlot1("");
    setSlot2("");
    setSlot3("");
    setSlot4("");
    setSlot5("");
    setDomain1("");
    setDomain2("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (status === "error") setStatus("default");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full"
      style={{ margin: 0 }}
    >
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 shadow-lg max-h-[60vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">
          Criar Nova Habilidade
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Nome da Habilidade*
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              placeholder="Ex: Soco de Fogo, Cura Divina"
              required
            />
          </div>

          {/* Domínios - Lado a lado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Domínio Primário*
              </label>
              <select
                value={domain1}
                onChange={(e) => setDomain1(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
                required
              >
                <option value="">Selecione...</option>
                {domains.map((dom) => (
                  <option key={dom.id} value={dom.id}>
                    {dom.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Domínio Secundário (Opcional)
              </label>
              <select
                value={domain2}
                onChange={(e) => setDomain2(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500"
              >
                <option value="">Selecione...</option>
                {domains.map((dom) => (
                  <option key={dom.id} value={dom.id}>
                    {dom.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Slots - Textareas grandes, um abaixo do outro */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((slot) => (
              <div key={slot} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Descrição Slot {slot}
                </label>
                <textarea
                  value={eval(`slot${slot}`)}
                  onChange={(e) => eval(`setSlot${slot}(e.target.value)`)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none border border-gray-600 focus:border-red-500 min-h-[80px]"
                  placeholder={`Descreva o efeito do slot ${slot}`}
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* Mensagens de status */}
          {status === "error" && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}

          {status === "success" && (
            <p className="text-green-400 text-sm">
              Habilidade criada com sucesso!
            </p>
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
