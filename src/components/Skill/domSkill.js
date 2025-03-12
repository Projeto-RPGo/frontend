import { useState, useEffect } from "react";

export default function DomSkill({ dom, userId }) {
  const [habs, setHabs] = useState([]);
  const [mcfs, setMcfs] = useState([]);
  const [espec, setEspec] = useState([]);
  const [domMax, setDomMax] = useState(null);
  const [expandedDom, setExpandedDom] = useState(false);
  const [expandedHabs, setExpandedHabs] = useState({}); // Expansão de habilidades
  const [expandedMcfs, setExpandedMcfs] = useState({}); // Expansão de MCFs
  const [expandedEspec, setExpandedEspec] = useState({}); // Expansão de especializações
  const [expandedDomMax, setExpandedDomMax] = useState({}); // Expansão de domínio máximo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDomSkill() {
      if (!dom?.id) return;

      setLoading(true);
      setError(null);
      let urlHab = `/api/skills?domId=${dom.id}`;
      if (userId) {
        urlHab += `&userId=${userId}`;
      }

      try {
        const habResponse = await fetch(urlHab);
        if (!habResponse.ok)
          throw new Error("Erro ao buscar dados das habilidades");
        const habData = await habResponse.json();
        setHabs(habData.habilidades || []);
        setMcfs(habData.mcf || []);
        setEspec(habData.especializacoes || []);
        setDomMax(habData.dominioMax || null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDomSkill();
  }, [dom, userId]);

  const toggleDom = () => {
    setExpandedDom(!expandedDom);
  };

  const toggleHab = (habId) => {
    setExpandedHabs((prev) => ({
      ...prev,
      [habId]: !prev[habId],
    }));
  };

  const toggleMcf = (mcfId) => {
    setExpandedMcfs((prev) => ({
      ...prev,
      [mcfId]: !prev[mcfId],
    }));
  };

  const toggleEspec = (habId) => {
    setExpandedEspec((prev) => ({
      ...prev,
      [habId]: !prev[habId],
    }));
  };

  const toggleDomMax = (habId) => {
    setExpandedDomMax((prev) => ({
      ...prev,
      [habId]: !prev[habId],
    }));
  };

  if (loading) {
    return <p className="text-gray-200">Carregando habilidades...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      {/* Título do Domínio */}
      <div
        onClick={toggleDom}
        className="cursor-pointer font-bold text-lg text-red-500 hover:text-red-600 transition-colors"
      >
        {dom ? dom.nome : "Carregando..."}
      </div>

      {/* Lista de Habilidades */}
      {expandedDom && (
        <div className="ml-6 mt-2">
          {habs.map((hab) => (
            <div key={hab.id} className="mt-2">
              {/* Nome da Habilidade */}
              <div
                onClick={() => toggleHab(hab.id)}
                className="cursor-pointer font-semibold text-gray-200 hover:text-gray-300 transition-colors"
              >
                {hab.nome}
              </div>

              {/* Detalhes da Habilidade */}
              {expandedHabs[hab.id] && (
                <div className="ml-6 mt-2 border-l-2 border-gray-700 pl-4">
                  {/* Slots */}
                  {hab.slots && hab.slots.length > 0 && (
                    <div className="border border-gray-700 rounded-lg p-3 mb-2">
                      <strong className="text-sm font-semibold text-red-500">
                        Slots:
                      </strong>
                      <ul className="list-disc list-inside">
                        {hab.slots.map((slot, index) => (
                          <li key={index} className="text-sm text-gray-200">
                            {slot}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* MCFs */}
                  {mcfs
                    .filter((mcf) => mcf.idHab1 === hab.id)
                    .map((mcf) => (
                      <div
                        key={mcf.id}
                        className="border border-gray-700 rounded-lg p-3 mb-2"
                      >
                        <div
                          onClick={() => toggleMcf(mcf.id)}
                          className="cursor-pointer font-semibold text-red-500 hover:text-red-600 transition-colors"
                        >
                          {mcf.nome}:
                        </div>
                        {expandedMcfs[mcf.id] && (
                          <ul className="list-disc list-inside ml-4">
                            {mcf.slots.map((slot, index) => (
                              <li key={index} className="text-sm text-gray-200">
                                {slot}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                  {/* Especializações */}
                  {espec.filter((espec) => espec.idHab1 === hab.id).length >
                    0 && (
                    <div className="border border-gray-700 rounded-lg p-3 mb-2">
                      <div
                        onClick={() => toggleEspec(hab.id)}
                        className="cursor-pointer font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        Especializações:
                      </div>
                      {expandedEspec[hab.id] && (
                        <ul className="list-disc list-inside">
                          {espec
                            .filter((espec) => espec.idHab1 === hab.id)
                            .map((espec) => (
                              <li
                                key={espec.id}
                                className="text-sm text-gray-200"
                              >
                                {espec.nome}
                                {espec.descricao && (
                                  <p className="text-xs text-gray-400 ml-4">
                                    {espec.descricao}
                                  </p>
                                )}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Domínio Máximo */}
                  {domMax && domMax.idHab1 === hab.id && (
                    <div className="border border-gray-700 rounded-lg p-3 mb-2">
                      <div
                        onClick={() => toggleDomMax(hab.id)}
                        className="cursor-pointer font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        Domínio Máximo:
                      </div>
                      {expandedDomMax[hab.id] && (
                        <div>
                          <p className="text-sm text-gray-200">{domMax.nome}</p>
                          <p className="text-xs text-gray-400">
                            {domMax.descricao}
                          </p>
                        </div>
                      )}
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
