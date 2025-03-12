import LoginCadastroForm from "@/components/Login/loginCadastroForm";
import LogoWithTitle from "../../../components/Images/logoWithTitle";
import Link from "next/link";

export default function CadastrarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-144px)] p-6">
      <div className="w-full max-w-sm p-4">
        {/* Reutilizando o componente de logo e título */}
        <LogoWithTitle />
        <LoginCadastroForm />
        <p className="text-center text-white mt-4 text-sm">
          Já tem conta?{" "}
          <Link href="/login" className="underline hover:text-gray-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}