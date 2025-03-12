"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormButton from "../Forms/formButton";
import InputField from "../Forms/inputField";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", show: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", show: false });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    apiError: "",
  });

  const isValid =
    Object.values(errors).every((error) => error === "") &&
    name.trim() !== "" &&
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== "";

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === "name") {
      newErrors.name = !value.trim() ? "O campo Nome é obrigatório." : "";
    }
    if (fieldName === "username") {
      newErrors.username = !value.trim() ? "O campo Username é obrigatório." : "";
    }
    if (fieldName === "email") {
      newErrors.email = !value.trim() ? "O campo Email é obrigatório." : "";
    }
    if (fieldName === "password") {
      newErrors.password = !value.trim() ? "O campo Senha é obrigatório." : "";
    }
    if (fieldName === "confirmPassword") {
      newErrors.confirmPassword =
        value !== password.value ? "As senhas não coincidem." : "";
    }

    setErrors(newErrors);
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === "name") setName(value);
    if (fieldName === "username") setUsername(value);
    if (fieldName === "email") setEmail(value);
    if (fieldName === "password") setPassword({ ...password, value });
    if (fieldName === "confirmPassword") setConfirmPassword({ ...confirmPassword, value });

    setErrors((prevErrors) => ({ ...prevErrors, apiError: "" }));
    validateField(fieldName, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, apiError: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, username, email, password: password.value }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta. Verifique os dados informados.");
      }

      const data = await response.json();
      router.push("/");
    } catch (error) {
      setErrors({ ...errors, apiError: error.message });
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <InputField type="text" name="name" placeholder="Nome" value={name} onChange={(e) => handleChange("name", e.target.value)} />
      {errors.name && <p className="text-white text-sm text-left ml-1">{errors.name}</p>}

      <InputField type="text" name="username" placeholder="Username" value={username} onChange={(e) => handleChange("username", e.target.value)} />
      {errors.username && <p className="text-white text-sm text-left ml-1">{errors.username}</p>}

      <InputField type="email" name="email" placeholder="Email" value={email} onChange={(e) => handleChange("email", e.target.value)} />
      {errors.email && <p className="text-white text-sm text-left ml-1">{errors.email}</p>}

      <InputField type={password.show ? "text" : "password"} name="password" placeholder="Senha" value={password.value} onChange={(e) => handleChange("password", e.target.value)} />
      {errors.password && <p className="text-white text-sm text-left ml-1">{errors.password}</p>}

      <InputField type={confirmPassword.show ? "text" : "password"} name="confirmPassword" placeholder="Confirmar Senha" value={confirmPassword.value} onChange={(e) => handleChange("confirmPassword", e.target.value)} />
      {errors.confirmPassword && <p className="text-white text-sm text-left ml-1">{errors.confirmPassword}</p>}

      {errors.apiError && <p className="text-red-500 text-sm text-center">{errors.apiError}</p>}

      <FormButton isValid={isValid}>CADASTRAR</FormButton>
    </form>
  );
}
