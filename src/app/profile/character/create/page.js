"use client";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";

export default function CreateCharacterPage() {
  const { user } = useAuth();
  const [character, setCharacter] = useState({
    name: "",
    age: "",
    race: "",
    status: "",
    rank: "0",
    affiliation: "",
    domain1_id: "",
    domain2_id: "",
    personality: "",
    background: "",
    appearance: "",
    avatar: null,
    user_id: user ? user.id : null,
  });

  const [races, setRaces] = useState([]);
  const [affiliations, setAffiliations] = useState([]);
  const [domains, setDomains] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setCharacter((prev) => ({
        ...prev,
        user_id: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raceRes, affiliationRes, domainRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/race/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/domain/`),
        ]);

        if (raceRes.ok) {
          const raceData = await raceRes.json();
          setRaces(raceData);
        }

        if (affiliationRes.ok) {
          const affiliationData = await affiliationRes.json();
          setAffiliations(affiliationData);
        }

        if (domainRes.ok) {
          const domainData = await domainRes.json();
          setDomains(domainData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCharacter((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setCharacter((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!character.name) newErrors.name = "Nome é obrigatório";
    if (!character.age || character.age < 1 || character.age > 120)
      newErrors.age = "Idade deve ser entre 1 e 120";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(character),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Personagem criado com sucesso:", data);
          cleanForm();
        } else {
          const errorData = await response.json();
          console.error("Erro ao criar personagem:", errorData);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
  };

  const cleanForm = () => {
    setCharacter({
      name: "",
      age: "",
      race: "",
      status: "",
      rank: "0",
      affiliation: "",
      domain1_id: "",
      domain2_id: "",
      personality: "",
      background: "",
      appearance: "",
      avatar: null,
      user_id: user ? user.id : null,
    });
  };

  return (
    <div className="bg-gray-900 text-white p-8 w-full min-h-screen flex items-center justify-center">
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
              {character.avatar ? (
                <div className="relative w-full h-full">
                  <img
                    src={character.avatar}
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
              name="appearance"
              value={character.appearance}
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
            <div className="grid">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Idade</label>
                <input
                  type="number"
                  name="age"
                  value={character.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={character.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                <select
                  name="race"
                  value={character.race}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
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
                  value={character.affiliation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Selecione uma afiliação</option>
                  {affiliations.map((affiliation) => (
                    <option key={affiliation.affiliation_id} value={affiliation.affiliation_id}>
                      {affiliation.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domínio 1
                </label>
                <select
                  name="domain1_id"
                  value={character.domain1_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
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
                  Domínio 2
                </label>
                <select
                  name="domain2_id"
                  value={character.domain2_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
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
                  name="personality"
                  value={character.personality}
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
                  name="background"
                  value={character.background}
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
