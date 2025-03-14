"use client";
import { useEffect, useState } from "react";
import AllCharacters from "@/components/Admin/allCharacters";

export default function CharactersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-gray-200">Carregando usuários...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Personagens Gerais</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Separados por players, veja todos os personagens cadastrados!
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-red-500 rounded-full"></div>
      </div>

      <div className="flex flex-col space-y-4">
        {users.map((user) => (
          <AllCharacters key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
