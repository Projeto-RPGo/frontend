"use client";
import CharacterCard from "@/components/Profile/characterCard";
import CreateCharacter from "@/components/Profile/createCharacter";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }

  useEffect(() => {
    if (!user?.id) return;

    async function fetchCharacters() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/characters/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar personagens");
        }
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [user]);

  if (!user) {
    return <p className="text-white">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Perfil</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-white">
          <strong>Nome:</strong> {user.name}
        </h3>
        <h3 className="text-white">
          <strong>Username:</strong> {user.username}
        </h3>
        <h3 className="text-white">
          <strong>Email:</strong> {user.email}
        </h3>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Personagens</h2>

      {loading ? (
        <p className="text-white">Carregando personagens...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characters.length > 0 &&
            characters.map((character) => (
              <CharacterCard key={character.character_id} character={character} />
            ))}
          <CreateCharacter />
        </div>
      )}
    </div>
  );
}
