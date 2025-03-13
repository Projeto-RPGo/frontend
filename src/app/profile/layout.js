"use client";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/authContext";
import HeaderProfile from "@/components/Headers/headerProfile";

function AuthInitializer() {
  const { setUsuario } = useAuth();

  useEffect(() => {
    setUsuario({
      id: 1,
      nome: "Usuário de Teste",
      email: "teste@teste.teste",
      username: "tester",
    });
  }, [setUsuario]);

  return null;
}

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <AuthInitializer />
      <HeaderProfile />
      <main className="flex-1 w-full overflow-auto pt-[100px]">{children}</main>
    </AuthProvider>
  );
}
