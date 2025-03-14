"use client";
import HeaderProfile from "@/components/Headers/headerProfile";
import { AuthProvider } from "@/context/authContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <HeaderProfile />
      <main className="pt-[100px]">{children}</main>
    </AuthProvider>
  );
}
