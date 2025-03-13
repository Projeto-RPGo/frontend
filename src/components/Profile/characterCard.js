import Link from 'next/link';

export default function CharacterCard({ character }) {
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
          <strong>Afiliação:</strong> {character.affiliation}
        </p>
        <p>
          <strong>Nível:</strong> {character.xp}
        </p>
      </div>
    </Link>
  );
}
