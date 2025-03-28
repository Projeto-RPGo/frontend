"use client";
import { useState, useEffect } from "react";
import { Icon } from "../../Icon/icon";
import getCookie from "@/utils/utils";

export default function ModalEditCharacter({
  isOpen,
  onClose,
  character,
  onCharacterUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    race: "",
    status: "",
    rank: "0",
    affiliation: "",
    domain1: "",
    domain2: "",
    personality: "",
    background: "",
    appearance: "",
    avatar: null,
  });
  const [races, setRaces] = useState([]);
  const [affiliations, setAffiliations] = useState([]);
  const [domains, setDomains] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name || "",
        age: character.age || "",
        race: character.race || "",
        status: character.status || "",
        rank: character.rank || "0",
        affiliation: character.affiliation || "",
        domain1: character.domain1 || "",
        domain2: character.domain2 || "",
        personality: character.personality || "",
        background: character.background || "",
        appearance: character.appearance || "",
        avatar: character.avatar || null,
      });
    }
  }, [character]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raceRes, affiliationRes, domainRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/race/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/domain/`),
        ]);

        if (raceRes.ok) setRaces(await raceRes.json());
        if (affiliationRes.ok) setAffiliations(await affiliationRes.json());
        if (domainRes.ok) setDomains(await domainRes.json());
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.age || formData.age < 1 || formData.age > 120)
      newErrors.age = "Idade deve ser entre 1 e 120";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/characters/${character.character_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar personagem");
      }

      onCharacterUpdated(data);
      setStatus("success");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
      console.error("Erro na requisição:", error);
    }
  };

  if (!isOpen || !character) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto w-full"
      style={{ margin: 0 }}
    >
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-4xl border border-gray-700 shadow-lg max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <Icon id="close" size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Editar Personagem
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção de Avatar */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-500">Avatar</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium mb-2">
                  Imagem atual
                </label>
                <div className="w-40 h-40 bg-gray-600 rounded-md overflow-hidden">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sem avatar
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Alterar imagem
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatar-input"
                  />
                  <label
                    htmlFor="avatar-input"
                    className="cursor-pointer px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition"
                  >
                    Selecionar
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition"
                  >
                    Remover
                  </button>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Nome da Aparência
                  </label>
                  <input
                    type="text"
                    name="appearance"
                    value={formData.appearance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ex: Goku - Dragon Ball Z"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Informações Básicas */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Idade*</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="1"
                  max="120"
                  required
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rank</label>
                <input
                  type="text"
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Seção de Atributos */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Atributos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Raça</label>
                <select
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione uma raça</option>
                  {races.map((race) => (
                    <option key={race.race_id} value={race.race_id}>
                      {race.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Afiliação
                </label>
                <select
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione uma afiliação</option>
                  {affiliations.map((aff) => (
                    <option key={aff.affiliation_id} value={aff.affiliation_id}>
                      {aff.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domínio Primário
                </label>
                <select
                  name="domain1"
                  value={formData.domain1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione um domínio</option>
                  {domains.map((domain) => (
                    <option key={domain.domain_id} value={domain.domain_id}>
                      {domain.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domínio Secundário
                </label>
                <select
                  name="domain2"
                  value={formData.domain2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione um domínio</option>
                  {domains.map((domain) => (
                    <option key={domain.domain_id} value={domain.domain_id}>
                      {domain.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Seção de Detalhes */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Detalhes Adicionais
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Personalidade
                </label>
                <textarea
                  name="personality"
                  value={formData.personality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  História de Fundo
                </label>
                <textarea
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                  rows="5"
                />
              </div>
            </div>
          </div>

          {/* Mensagens de status */}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}
          {status === "success" && (
            <p className="text-green-400 text-sm text-center">
              Personagem atualizado com sucesso!
            </p>
          )}

          {/* Botões */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-600 transition"
              disabled={status === "loading"}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {status === "loading" ? (
                <>
                  <Icon id="spinner" size={20} className="animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
