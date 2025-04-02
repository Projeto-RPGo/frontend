export default function NPCCard({ npc }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 transition duration-300 ease-in-out active:bg-gray-600">
      <h3 className="text-xl font-bold">{npc.name}</h3>
      <p>
        <strong>Título: </strong> {npc.title}
      </p>
      <p>
        <strong>Afiliação: </strong> {npc.affiliation}
      </p>
      <p>{npc.description}</p>
    </div>
  );
}
