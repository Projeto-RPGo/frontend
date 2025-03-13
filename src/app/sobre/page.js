
import LogoWithTitle from "@/components/Images/logoWithTitle";
import Footer from "@/components/Footer/footer";

export default function SobrePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-144px)] p-6">
      <div className="w-full max-w-sm">
        {/* Componente para o logo e título */}
        <LogoWithTitle />
      </div>
    </div>
  );
}
