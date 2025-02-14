
import HeaderMenu from "@/components/hearderMenu";
import LogoWithTitle from "@/components/logoWithTitle";

export default function SobrePage() {
    return (
        <div className="bg-[#D4A59A] pt-5">
          <HeaderMenu />
      
          <div className="flex items-center justify-center h-screen bg-[#D4A59A] pb-10">
            <div className="w-full max-w-sm p-6">
              {/* Componente para o logo e título */}
              <LogoWithTitle />
            </div>
          </div>
        </div>
    );
}
