"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import CardPersonagem from "@/components/Profile/cardPersonagem";
import CreatePersonagem from "@/components/Profile/createPersonagem";

export default function AdmPage() {
  const { usuario } = useAuth();
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    async function fetchPersonagens() {
      const response = await fetch(`/api/adm/personagens`);
      const data = await response.json();
      setPersonagens(data);
    }

    const perso1 = {
      id: 1,
      nome: "Personagem de Teste",
      afiliacao: "Guarda Real",
      nivel: 100,
      imagem:
        "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };
    const perso2 = {
      id: 2,
      nome: "Personagem de Teste 2",
      afiliacao: "Clero",
      nivel: 250,
      imagem:
        "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };

    const perso3 = {
      id: 3,
      nome: "Personagem de Teste 3",
      afiliacao: "Guarda Real",
      nivel: 300,
      imagem:
        "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };
    const perso4 = {
      id: 4,
      nome: "Personagem de Teste 4",
      afiliacao: "Clero",
      nivel: 350,
      imagem:
        "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };
    const perso5 = {
      id: 5,
      nome: "Personagem de Teste 5",
      afiliacao: "Guarda Real",
      nivel: 430,
      imagem:
        "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };

    setPersonagens([perso1, perso2]);
  }, [usuario]);

  if (!usuario) {
    return <p className="text-white">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Administrador</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-white">
          <strong>Nome:</strong> {usuario.nome}
        </h3>
        <h3 className="text-white">
          <strong>Username:</strong> {usuario.username}
        </h3>
        <h3 className="text-white">
          <strong>Email:</strong> {usuario.email}
        </h3>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Personagens</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {personagens.length > 0 &&
          personagens.map((personagem) => (
            <CardPersonagem key={personagem.id} personagem={personagem} adm={usuario.adm}/>
          ))}
        <CreatePersonagem />
      </div>
    </div>
  );
}
