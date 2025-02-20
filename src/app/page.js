"use client";
import FormButton from "@/components/Forms/formButton";
import LogoWithTitle from "@/components/Images/logoWithTitle";
import Footer from "@/components/Footer/footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm p-6">
          <LogoWithTitle />
          <FormButton
            className="w-full py-3 rounded-full transition text-[#A63F3F] bg-white hover:bg-gray-100 shadow-black shadow-sm"
            onClick={() => router.push("/profile")}
            isValid={true}
          >
            ACESSAR MUNDO
          </FormButton>
        </div>
      </div>
      <Footer /> {/* Adicionando o Footer aqui */}
    </div>
  );
}
