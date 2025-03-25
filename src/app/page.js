"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormButton from "@/components/Forms/formButton";
import LogoWithTitle from "@/components/Images/logoWithTitle";

export default function HomePage() {
  const router = useRouter();
  const [isSuperUser, setIsSuperUser] = useState(null); 

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
      return;
    }

    async function fetchUserData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        });

        if (!response.ok) {
          router.push("/login"); // Caso não consiga buscar dados, redireciona para login
          return;
        }

        const data = await response.json();
        setIsSuperUser(data.is_superuser);
      } catch {
        router.push("/login"); // Caso haja erro, redireciona para login
      }
    }

    fetchUserData();
  }, [router]);

  const handleButtonClick = () => {
    if (isSuperUser) {
      router.push("/admin");
    } else {
      router.push("/profile");
    }
  };

  if (isSuperUser === null) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-144px)] p-6">
      <div className="w-full max-w-sm">
        <LogoWithTitle />
        <FormButton
          className="w-full py-3 rounded-full transition text-[#A63F3F] bg-white hover:bg-gray-100 shadow-black shadow-sm mt-6"
          onClick={handleButtonClick}
          isValid={true}
        >
          ACESSAR MUNDO
        </FormButton>
      </div>
    </div>
  );
}
