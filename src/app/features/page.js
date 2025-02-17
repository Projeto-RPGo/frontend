
import LogoWithTitle from "@/components/Images/logoWithTitle";

export default function SobrePage() {
    return (
        <div className="bg-[#D4A59A] pt-5">      
          <div className="flex items-center justify-center h-auto bg-[#D4A59A] pb-10">
            <div className="w-full max-w-sm p-6">
              {/* Componente para o logo e título */}
              <LogoWithTitle />
            </div>
          </div>
        </div>
    );
}
