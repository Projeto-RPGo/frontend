"use client";
import { Icon } from "@/components/Icon/icon";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer logout");
      }

      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
    >
      <Icon id="logout" size={18} className="mr-2" />
      Sair
    </button>
  );
}
