"use client";
import { Icon } from "../Icon/icon";

export default function Race({ race }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4">
      {/* Título da Afiliação */}
      <div className="font-bold text-lg text-blue-500">
        {race.name}
      </div>

      {/* Descrição da Afiliação */}
      {race.description && (
        <p className="text-sm text-gray-300 mt-2">
          {race.description}
        </p>
      )}
    </div>
  );
}