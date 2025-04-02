import Link from "next/link";
import { useEffect, useState } from "react";

export default function CharacterCard({ character }) {
  const [affiliation, setAffiliation] = useState(null);

  useEffect(() => {
    async function fetchAffiliation() {
      if (!character?.affiliation) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/affiliation/${character.affiliation}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAffiliation(data);
        } else {
          console.error("Erro ao buscar afiliação:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    fetchAffiliation();
  }, [character]);

  return (
    <Link href={`/profile/character?id=${character.character_id}`} passHref>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 active:bg-gray-600">
        <img
          src={character.avatar}
          alt={character.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-xl font-bold">{character.name}</h3>
        <p>
          <strong>Afiliação:</strong> {affiliation?.name}
        </p>
        <p>
          <strong>Nível(XP):</strong> {character.xp}
        </p>
        <p>
          <strong>Euros:</strong> {character.euros}
        </p>
      </div>
    </Link>
  );
}
