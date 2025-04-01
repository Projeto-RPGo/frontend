"use client";
import { useState } from "react";
import CreateCard from "@/components/Admin/createCard";
import ModalNewAffiliation from "@/components/Admin/modalCreate/modalNewAffiliation";

export default function AffiliationPage() {
  const [isModalOpenAffiliation, setIsModalOpenAffiliation] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="flex space-x-4 mt-6">
        <CreateCard
          onClick={() => setIsModalOpenAffiliation(true)}
          message="Criar Afiliação"
        />

        <ModalNewAffiliation
          isOpen={isModalOpenAffiliation}
          onClose={() => setIsModalOpenAffiliation(false)}
          // Adicione aqui quaisquer props necessárias para o modal de afiliação
        />
      </div>
    </div>
  );
}