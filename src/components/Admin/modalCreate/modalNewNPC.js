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
    association: "", // Alterado de affiliation para association
    appearance: "",
    avatar: "", // Agora é uma string (base64)
  });
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  const csrftoken = getCookie("csrftoken");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validação do arquivo
      if (!file.type.match("image.*")) {
        setStatus("error");
        setErrorMessage("Por favor, selecione um arquivo de imagem (JPEG, PNG)");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setStatus("error");
        setErrorMessage("A imagem deve ter menos de 2MB");
        return;
      }

      // Converte para base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatar: "" }));
  };

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
            ...formData,
            is_npc: true // Adiciona campo is_npc se necessário
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro detalhado:", errorData);
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Erro ao criar NPC. Status: ${response.status}`
        );
      }

      const data = await response.json();
      onNPCCreated(data);
      
      // Reset do formulário
      setFormData({
        name: "",
        description: "",
        title: "",
        association: "",
        appearance: "",
        avatar: "",
      });
      setStatus("success");
      
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro completo:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("default");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">Criar Novo NPC</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seção de Avatar */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Avatar</label>
            <div className="flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer w-32 h-32 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center hover:bg-gray-600 transition-colors"
              >
                {formData.avatar ? (
                  <div className="relative w-full h-full">
                    <img
                      src={formData.avatar}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAvatar();
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <Icon id="close" size={12} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Icon id="upload" size={24} className="mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">Adicionar imagem</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">Suporta: JPG, PNG (Max. 2MB)</p>
          </div>

          {/* Campos do formulário */}
          <div className="grid gap-4">
            <div>
              <label htmlFor="appearance" className="block text-sm font-medium text-gray-300 mb-1">
                Nome da Aparência
              </label>
              <input
                id="appearance"
                name="appearance"
                type="text"
                value={formData.appearance}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-600"
                placeholder="Ex: Gandalf - O Branco"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nome do NPC*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-600"
                placeholder="Ex: Gandalf"
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-600"
                placeholder="Ex: O Mago Cinzento"
              />
            </div>

            <div>
              <label htmlFor="association" className="block text-sm font-medium text-gray-300 mb-1">
                Associação
              </label>
              <input
                id="association"
                name="association"
                type="text"
                value={formData.association}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-600"
                placeholder="Ex: Istari"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-600"
                placeholder="Descreva o NPC..."
              />
            </div>
          </div>

          {/* Mensagens de status */}
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

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              disabled={status === "loading"}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Icon id="spinner" size={20} className="animate-spin mr-2" />
                  Criando...
                </>
              ) : (
                "Criar NPC"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}