"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormButton from "@/components/Forms/formButton";
import LogoWithTitle from "@/components/Images/logoWithTitle";

export default function HomePage() {
  const router = useRouter();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }

  useEffect(() => {
    const csrftoken = getCookie("csrftoken");

    if (!csrftoken) {
      router.push("/login");
    } else {
      router.push("/"); 
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-144px)] p-6">
      <div className="w-full max-w-sm">
        <LogoWithTitle />
        <FormButton
          className="w-full py-3 rounded-full transition text-[#A63F3F] bg-white hover:bg-gray-100 shadow-black shadow-sm mt-6"
          onClick={() => router.push("/profile")}
          isValid={true}
        >
          ACESSAR MUNDO
        </FormButton>
      </div>
    </div>
  );
}
