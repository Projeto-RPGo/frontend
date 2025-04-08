export default function QuestCard({ quest }) {
  const statusColors = {
    ACTIVE: {
      bg: "bg-green-900/30",
      dot: "bg-green-400",
      text: "text-green-400",
      title: "text-green-400",
    },
    COMPLETED: {
      bg: "bg-gray-600/30",
      dot: "bg-gray-400",
      text: "text-gray-400",
      title: "text-gray-400",
    },
    CANCELED: {
      bg: "bg-red-900/30",
      dot: "bg-red-400",
      text: "text-red-400",
      title: "text-red-400",
    },
  };

  const colors = statusColors[quest.status] || statusColors.ACTIVE;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4 w-80 flex flex-col gap-3">
      {/* Título e Status */}
      <div className="flex flex-col gap-2">
        <h2 className={`text-xl font-bold ${colors.title}`}>{quest.name}</h2>
        <div
          className={`inline-flex items-center ${colors.bg} px-3 py-1 rounded-full w-fit`}
        >
          <span className={`w-2 h-2 rounded-full ${colors.dot} mr-2`}></span>
          <span className={`text-xs font-medium ${colors.text}`}>
            {quest.status === "ACTIVE" && "EM ANDAMENTO"}
            {quest.status === "COMPLETED" && "CONCLUÍDA"}
            {quest.status === "CANCELED" && "CANCELADA"}
          </span>
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>{quest.type}</span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-300 mt-1">{quest.description}</p>

      {/* Informações de Premiação e Nível */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-bold ${colors.text}`}>
            Premiação Máxima:
          </span>
          <span className="text-sm text-white">
            {quest.max_player_xp} XP/Euros
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm font-bold ${colors.text}`}>Nível:</span>
          <span className="text-sm text-white">
            {quest.min_level} ~ {quest.max_level}
          </span>
        </div>
      </div>
    </div>
  );
}
