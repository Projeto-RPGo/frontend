"use client";
import FormButton from "@/components/Forms/formButton";
import LogoWithTitle from "@/components/Images/logoWithTitle";
import Footer from "@/components/Footer/footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
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
