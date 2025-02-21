import Link from 'next/link'; // Importa o Link do Next.js

export default function CardPersonagem({ personagem }) {
  return (
    <Link href={`/profile/personagem?id=${personagem.id}`} passHref>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 active:bg-gray-600">
        <img
          src={personagem.imagem}
          alt={personagem.nome}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-xl font-bold">{personagem.nome}</h3>
        <p>
          <strong>Afiliação:</strong> {personagem.afiliacao}
        </p>
        <p>
          <strong>Nível:</strong> {personagem.nivel}
        </p>
      </div>
    </Link>
  );
}
