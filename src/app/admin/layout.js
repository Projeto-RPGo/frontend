"use client";
import HeaderAdmin from "@/components/Headers/headerAdmin";
import { AuthProvider } from "@/context/authContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <HeaderAdmin />
      <main className="pt-[100px]">{children}</main>
    </AuthProvider>
  );
}
