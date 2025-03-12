"use client";
import InfoText from "@/components/Profile/Perso/infoText";
import { useEffect, useState } from "react";

export default function PersonagemPage() {
  const [personagem, setPersonagem] = useState(null);
  const [editando, setEditando] = useState(false); // Estado para controlar se está editando
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [aparencia, setAparencia] = useState("");
  const [raca, setRaca] = useState("");
  const [afiliacaoId, setAfiliacaoId] = useState("");
  const [xp, setXp] = useState("");
  const [euros, setEuros] = useState("");
  const [status, setStatus] = useState("");
  const [patente, setPatente] = useState("");
  const [dominio1, setDominio1] = useState("");
  const [dominio2, setDominio2] = useState("");
  const [personalidade, setPersonalidade] = useState("");
  const [backgroundHistory, setBackgroundHistory] = useState("");

  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const isEditable = true;

  useEffect(() => {
    async function fetchPersonagem() {
      if (!id) {
        // Mockando os dados caso não haja ID
        const perso = {
          playerId: 1,
          persoId: 101,
          nome: "Oliver Von Fersen",
          idade: 16,
          aparencia:
            "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          raca: "Meio Draconiano",
          afiliaçãoId: "Clero",
          xp: 750,
          euros: 200,
          status: "Vivo",
          patente: "Cavaleiro de Rosa Cruz",
          dominio1: "Hikari",
          dominio2: "Kaji",
          personalidade: "Bravo e corajoso",
          backgroundHistory: "Um herói nascido nas terras distantes de Fersen.",
        };
        setPersonagem(perso);
        setNome(perso.nome);
        setIdade(perso.idade);
        setAparencia(perso.aparencia);
        setRaca(perso.raca);
        setAfiliacaoId(perso.afiliaçãoId);
        setXp(perso.xp);
        setEuros(perso.euros);
        setStatus(perso.status);
        setPatente(perso.patente);
        setDominio1(perso.dominio1);
        setDominio2(perso.dominio2);
        setPersonalidade(perso.personalidade);
        setBackgroundHistory(perso.backgroundHistory);
        return;
      }

      console.log("ID do personagem:", id);
      const response = await fetch(`/api/personagens/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPersonagem(data);
        setNome(data.nome);
        setIdade(data.idade);
        setAparencia(data.aparencia);
        setRaca(data.raca);
        setAfiliacaoId(data.afiliaçãoId);
        setXp(data.xp);
        setEuros(data.euros);
        setStatus(data.status);
        setPatente(data.patente);
        setDominio1(data.dominio1);
        setDominio2(data.dominio2);
        setPersonalidade(data.personalidade);
        setBackgroundHistory(data.backgroundHistory);
      } else {
        console.log("opa, deu ruim");
      }
    }

    fetchPersonagem(); // Chama a função de busca do personagem
  }, [id]); // Adiciona `id` como dependência

  const handleSalvar = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações
    const personagemAtualizado = {
      ...personagem,
      nome,
      idade,
      aparencia,
      raca,
      afiliaçãoId: afiliacaoId,
      xp,
      euros,
      status,
      patente,
      dominio1,
      dominio2,
      personalidade,
      backgroundHistory,
    };
    console.log('Dados salvos:', personagemAtualizado);
    setEditando(false); // Sai do modo de edição após salvar
  };

  if (!personagem) {
    return (
      <p className="text-white">Carregando informações do personagem...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{nome}</h1>
      {isEditable && !editando && (
        <button
          onClick={() => setEditando(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
        >
          Editar
        </button>
      )}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 flex">
        {/* Seção da imagem */}
        <div className="w-2/5 pr-4">
          <img
            src={aparencia}
            alt={nome}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        {/* Seção das informações */}
        <div className="w-3/5">
          {editando ? (
            // Modo de edição
            <div>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Nome"
              />
              <input
                type="text"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Idade"
              />
              <input
                type="text"
                value={aparencia}
                onChange={(e) => setAparencia(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Aparência"
              />
              <input
                type="text"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Raça"
              />
              <input
                type="text"
                value={afiliacaoId}
                onChange={(e) => setAfiliacaoId(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Afiliação"
              />
              <input
                type="text"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="XP"
              />
              <input
                type="text"
                value={euros}
                onChange={(e) => setEuros(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Euros"
              />
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Status"
              />
              <input
                type="text"
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Patente"
              />
              <input
                type="text"
                value={dominio1}
                onChange={(e) => setDominio1(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Domínio 1"
              />
              <input
                type="text"
                value={dominio2}
                onChange={(e) => setDominio2(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Domínio 2"
              />
              <input
                type="text"
                value={personalidade}
                onChange={(e) => setPersonalidade(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="Personalidade"
              />
              <input
                type="text"
                value={backgroundHistory}
                onChange={(e) => setBackgroundHistory(e.target.value)}
                className="w-full p-2 mb-2 rounded-md text-black"
                placeholder="História de Fundo"
              />
              <button
                onClick={handleSalvar}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          ) : (
            // Modo de visualização
            <div>
              <InfoText
                label="Nível"
                value={xp}
                labelColor="text-red-500"
                valueColor="text-gray-200"
              />
              <InfoText
                label="Euros"
                value={euros}
                labelColor="text-red-500"
                valueColor="text-gray-200"
              />
              <InfoText label="Afiliação" value={afiliacaoId} />
              <InfoText label="Patente" value={patente} />
              <InfoText
                label="Domínio(s)"
                value={
                  dominio2
                    ? `${dominio1} e ${dominio2}`
                    : dominio1
                }
              />
              <InfoText label="Raça" value={raca} />
              <InfoText label="Idade" value={idade} />
              <InfoText label="Personalidade" value={personalidade} />
              <InfoText
                label="História de Fundo"
                value={backgroundHistory}
              />
              <InfoText label="Status" value={status} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}