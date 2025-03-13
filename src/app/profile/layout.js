"use client";
import HeaderProfile from "@/components/Headers/headerProfile";
import { AuthProvider } from "@/context/authContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <HeaderProfile />
      <main>{children}</main>
    </AuthProvider>
  );
}
