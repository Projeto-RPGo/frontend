"use client";
import { useState } from "react";

export default function CriarPersonagemPage() {
  const [personagem, setPersonagem] = useState({
    nome: "",
    idade: "",
    raca: "",
    afiliacao: "",
    dominio1: "",
    dominio2: "",
    personalidade: "",
    backgroundHistory: "",
    aparencia: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonagem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonagem((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveAvatar = () => {
    setPersonagem((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!personagem.nome) newErrors.nome = "Nome é obrigatório";
    if (!personagem.idade || personagem.idade < 1 || personagem.idade > 120)
      newErrors.idade = "Idade deve ser entre 1 e 120";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Personagem criado:", personagem);
      cleanForm();
    }
  };

  const cleanForm = () => {
    setPersonagem({
      nome: "",
      idade: "",
      raca: "",
      afiliacao: "",
      dominio1: "",
      dominio2: "",
      personalidade: "",
      backgroundHistory: "",
      aparencia: "",
      avatar: null,
    });
  };

  return (
    <div className="bg-gray-900 text-white p-8 w-full flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Criar Personagem
        </h1>

        {/* Seção de Avatar */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Avatar</h2>
          <label className="block text-sm font-medium mb-1">
            Escolha sua imagem:
          </label>
          <div className="flex items-center justify-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="avatar-input"
            />
            <label
              htmlFor="avatar-input"
              className="cursor-pointer w-60 h-60 bg-gray-700 border-2 border-gray-600 rounded-md flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              {personagem.avatar ? (
                <div className="relative w-full h-full">
                  <img
                    src={personagem.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    onClick={handleRemoveAvatar}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors"
                  >
                    X
                  </button>
                </div>
              ) : (
                <span className="text-gray-400">Clique para escolher</span>
              )}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome da Aparência:
            </label>
            <input
              type="text"
              name="aparencia"
              value={personagem.aparencia}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ex: Goku - Dragon Ball Z"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção de Informações Básicas */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={personagem.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Idade</label>
                <input
                  type="number"
                  name="idade"
                  value={personagem.idade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.idade && (
                  <p className="text-red-500 text-sm mt-1">{errors.idade}</p>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Atributos */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Atributos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Raça</label>
                <input
                  type="text"
                  name="raca"
                  value={personagem.raca}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Afiliação
                </label>
                <input
                  type="text"
                  name="afiliacao"
                  value={personagem.afiliacao}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domínio 1
                </label>
                <input
                  type="text"
                  name="dominio1"
                  value={personagem.dominio1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domínio 2
                </label>
                <input
                  type="text"
                  name="dominio2"
                  value={personagem.dominio2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Seção de Detalhes Adicionais */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Detalhes Adicionais
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Personalidade
                </label>
                <textarea
                  name="personalidade"
                  value={personagem.personalidade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  História de Fundo
                </label>
                <textarea
                  name="backgroundHistory"
                  value={personagem.backgroundHistory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Botões de Envio e Cancelar */}
          <div className="text-center space-x-4">
            <button
              type="button"
              onClick={() => cleanForm()}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
