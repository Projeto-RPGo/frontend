import LogoWithTitle from "@/components/Images/logoWithTitle";
import Image from "next/image";
import Link from "next/link";

export default function SobrePage() {
  const teamMembers = [
    {
      name: "Abraão Valentim de Araújo",
      role: "Desenvolvedor",
      image: "/img/dev-abraao.png",
      contact: "https://github.com/abraaovalentim"
    },
    {
      name: "Jônatas Tavares dos Santos",
      role: "Desenvolvedor",
      image: "/img/dev-jonatas.png",
      contact: "https://github.com/JonatasTavaresS"
    },
    {
      name: "Felipe da Silva Gangorra",
      role: "Desenvolvedor",
      image: "/img/dev-felipe.png",
      contact: "https://github.com/felipegangorra"
    },
    {
      name: "Sabrina Barbosa da Silva",
      role: "Desenvolvedor",
      image: "/img/dev-sabrina.png",
      contact: "https://github.com/sabrinabs"
    },
    {
      name: "Diogo Alves Silveira",
      role: "Desenvolvedor",
      image: "/img/dev-diogo.png",
      contact: "https://github.com/diogoasilveira"
    },
    {
      name: "Letícia Farias Costa Vieira",
      role: "Desenvolvedor",
      image: "/img/dev-leticia.png",
      contact: "https://github.com/LeticiaFarias21"
    },
    {
      name: "Bruno Machado de Assis",
      role: "Desenvolvedor",
      image: "/img/dev-bruno.png",
      contact: "https://github.com/brunobr357"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-900 w-full py-4">
        <div className="max-w-7xl mx-auto px-4">
        </div>
      </div>

      {/* Cabeçalho com logo */}
      <header className="pt-12 pb-0 flex justify-center bg-gray-900">
        <div className="w-full max-w-sm px-4">
          <LogoWithTitle />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow bg-gray-900 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Seção Sobre o Projeto */}
          <section className="mb-16 mt-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Sobre o RPGo!</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mx-auto max-w-4xl">
              <p className="text-lg text-white p-4">
                O RPGo! é uma plataforma inovadora projetada para automatizar e simplificar partidas de RPG textual, 
                permitindo que jogadores e mestres se concentrem na diversão e na narrativa.<br /><br />
                
                Nossa missão é tornar o RPG acessível para todos, eliminando barreiras técnicas e burocráticas, 
                para que você possa mergulhar diretamente na aventura.<br /><br />
                
                Com ferramentas integradas para criação de personagens e gerenciamento de campanhas, o RPGo! 
                está revolucionando a maneira como jogamos RPGs online.<br /><br />

                Para mais detalhes sobre o projeto, acesse nosso repositorio
                <a href="https://github.com/Projeto-RPGo" className="text-blue-400 underline"> aqui</a>.
              </p>
            </div>
          </section>
          
          {/* Seção Equipe */}
          <section className="px-2">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Nossa Equipe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md text-center hover:scale-105 transition-transform">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-purple-500">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-md font-bold mb-1 text-white">{member.name}</h3>
                  <p className="text-sm text-purple-300 mb-3">{member.role}</p>
                  <Link 
                    href={member.contact} 
                    className="text-purple-400 hover:text-purple-200 text-sm font-medium transition-colors"
                    target="_blank"
                  >
                    Contato
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}