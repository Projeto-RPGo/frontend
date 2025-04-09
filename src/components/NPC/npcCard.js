export default function NPCCard({ npc }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 transition duration-300 ease-in-out hover:bg-gray-700">
      {/* Seção do Avatar */}
      <div className="relative h-32 w-full mb-3 bg-gray-700 rounded-lg overflow-hidden">
        {npc.avatar ? (
          <img
            src={npc.avatar}
            alt={`Avatar de ${npc.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        )}
      </div>

      {/* Informações do NPC */}
      <h3 className="text-xl font-bold truncate">{npc.name}</h3>
      
      {npc.appearance && (
        <p className="text-sm text-gray-300 italic mb-2">"{npc.appearance}"</p>
      )}

      {npc.title && (
        <p className="text-sm">
          <strong className="text-gray-400">Título: </strong> 
          <span className="text-yellow-400">{npc.title}</span>
        </p>
      )}

      {npc.association && (
        <p className="text-sm">
          <strong className="text-gray-400">Associação: </strong> 
          <span className="text-blue-400">{npc.association}</span>
        </p>
      )}

      {npc.description && (
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {npc.description}
        </p>
      )}
    </div>
  );
}