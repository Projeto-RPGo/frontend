import { useState, useEffect } from "react";
import { Icon } from "../Icon/icon";

export default function DomAffiliation({ affiliation, userId }) {
  const [members, setMembers] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [expandedAffiliation, setExpandedAffiliation] = useState(false);
  const [expandedRanks, setExpandedRanks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAffiliationData() {
      if (!affiliation?.id) return;

      setLoading(true);
      setError(null);
      let url = `/api/affiliation/${affiliation.id}`;
      if (userId) {
        url += `?userId=${userId}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar dados da afiliação");
        const data = await response.json();
        setMembers(data.members || []);
        setRanks(data.ranks || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliationData();
  }, [affiliation, userId]);

  const toggleAffiliation = () => {
    setExpandedAffiliation(!expandedAffiliation);
  };

  const toggleRank = (rankId) => {
    setExpandedRanks((prev) => ({
      ...prev,
      [rankId]: !prev[rankId],
    }));
  };

  if (loading) {
    return <p className="text-gray-200">Carregando afiliação...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      {/* Título da Afiliação */}
      <div
        onClick={toggleAffiliation}
        className="cursor-pointer font-bold text-lg text-blue-500 hover:text-blue-600 transition-colors flex items-center"
      >
        {affiliation ? affiliation.name : "Carregando..."}
        <Icon
          id={"expand"}
          height={15}
          width={8}
          className={`ml-2 transition-transform duration-300 ${
            expandedAffiliation ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>

      {/* Descrição da Afiliação */}
      {affiliation?.description && (
        <p className="text-sm text-gray-300 mt-1 ml-2">
          {affiliation.description}
        </p>
      )}

      {/* Conteúdo expandido */}
      {expandedAffiliation && (
        <div className="ml-6 mt-2">
          {/* Membros */}
          {members.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold text-gray-200">Membros</h4>
              <ul className="list-disc list-inside ml-4">
                {members.map((member) => (
                  <li key={member.id} className="text-sm text-gray-300">
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hierarquia/Ranks */}
          {ranks.map((rank) => (
            <div key={rank.id} className="mt-2">
              {/* Nome do Rank */}
              <div
                onClick={() => toggleRank(rank.id)}
                className="cursor-pointer font-semibold text-blue-400 hover:text-blue-500 transition-colors flex items-center"
              >
                {rank.name}
                <Icon
                  id={"expand"}
                  height={15}
                  width={8}
                  className={`ml-2 transition-transform duration-300 ${
                    expandedRanks[rank.id] ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {/* Detalhes do Rank */}
              {expandedRanks[rank.id] && (
                <div className="ml-6 mt-2 border-l-2 border-gray-700 pl-4">
                  {rank.description && (
                    <p className="text-sm text-gray-300">{rank.description}</p>
                  )}
                  {rank.permissions && rank.permissions.length > 0 && (
                    <div className="mt-1">
                      <h5 className="text-xs font-semibold text-gray-400">
                        Permissões:
                      </h5>
                      <ul className="list-disc list-inside ml-4">
                        {rank.permissions.map((permission, index) => (
                          <li
                            key={index}
                            className="text-xs text-gray-300"
                          >
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {rank.members && rank.members.length > 0 && (
                    <div className="mt-1">
                      <h5 className="text-xs font-semibold text-gray-400">
                        Membros deste rank:
                      </h5>
                      <ul className="list-disc list-inside ml-4">
                        {rank.members.map((member) => (
                          <li
                            key={member.id}
                            className="text-xs text-gray-300"
                          >
                            {member.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}