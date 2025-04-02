"use client";
import Rank from "@/components/Rank/rank";
import AllNPCs from "@/components/NPC/allNPCs";

export default function CharactersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Personagens Gerais</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Veja todos os NPCs, além do ranking de personagens!
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-blue-500 rounded-full"></div>
      </div>

      <AllNPCs />
      <div className="flex justify-center mb-6 mt-6">
        <div className="w-10/12 h-1 bg-yellow-500 rounded-full"></div>
      </div>

      <Rank />
    </div>
  );
}
