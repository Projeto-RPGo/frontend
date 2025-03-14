export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-3">O Mundo</h1>
      <h2 className="text-lg text-gray-400 mb-6">
        Administre o seu mundo da melhor forma! O céu é o limite!
      </h2>
      <div className="flex justify-center mb-6">
        <div className="w-10/12 h-1 bg-red-500 rounded-full"></div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-white">
          <strong>Nome:</strong> Sanctum RPG
        </h3>
        <h3 className="text-white">
          <strong>Mestre:</strong> Admin
        </h3>
      </div>
    </div>
  );
}
