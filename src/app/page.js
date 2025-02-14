"use client";  // Necessário para usar useRouter em componentes Client

import { useRouter } from "next/navigation";
import LogoWithTitle from "../components/logoWithTitle";
import InputField from "../components/inputField";
import Button from "../components/button";
import ForgotPassword from "../components/forgotPassword";
import HeaderMenu from "../components/hearderMenu";
import UserIcon from "../lib/icons/UserIcon";
import PasswordIcon from "../lib/icons/PasswordIcon";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="bg-[#D4A59A] pt-5">
      <HeaderMenu />
  
      <div className="flex items-center justify-center h-screen bg-[#D4A59A] pb-10">
        <div className="w-full max-w-sm p-6">
          {/* Componente para o logo e título */}
          <LogoWithTitle />

          {/* Inputs e Botões */}
          <div className="space-y-6">
            <InputField type="text" placeholder="USERNAME" icon={<UserIcon />} />
            <InputField type="password" placeholder="PASSWORD" icon={<PasswordIcon />} />
            <Button label="LOGIN" variant="primary" />

            {/*Botão Criar Conta com Redirecionamento */}
            <Button label="CRIAR CONTA" variant="secondary" onClick={() => router.push("/signUp")}/>

            {/* Link para "Forgot Password" */}
            <ForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
}
