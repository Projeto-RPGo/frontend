"use client";

import { useRouter } from "next/navigation";
import LogoWithTitle from "../../components/Images/logoWithTitle";
import LoginForm from "@/components/Login/loginForm";
import FormButton from "@/components/Forms/formButton";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-144px)] p-6">
      <div className="w-full max-w-sm p-4">
        <LogoWithTitle />
        <div className="space-y-4 mt-6">
          <LoginForm />
          <FormButton
            className="w-full py-3 rounded-full transition text-[#A63F3F] bg-white hover:bg-gray-100"
            onClick={() => router.push("/login/cadastrar")}
            isValid={true}
          >
            CRIAR CONTA
          </FormButton>
        </div>
      </div>
    </div>
  );
}