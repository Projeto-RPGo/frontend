"use client";

import { useState } from "react";
import FormButton from "../Forms/formButton";
import InputField from "../Forms/inputField";
import { Icon } from "../Icon/icon";

export default function LoginCadastroForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", show: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    show: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isValid =
    Object.values(errors).every((error) => error === "") &&
    username.trim() !== "" &&
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== "";

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === "username") {
      newErrors.username = !value.trim()
        ? "O campo Username é obrigatório."
        : "";
    }

    if (fieldName === "name") {
      newErrors.name = !value.trim() ? "O campo Nome é obrigatório." : "";
    }

    if (fieldName === "email") {
      if (!value.trim()) {
        newErrors.email = "O campo Email é obrigatório.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !emailRegex.test(value)
          ? "O campo Email não é válido."
          : "";
      }
    }

    if (fieldName === "password") {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      newErrors.password = !passwordRegex.test(value)
        ? "A senha deve ter pelo menos 8 caracteres, incluindo letras e números."
        : "";
    }

    if (fieldName === "confirmPassword") {
      newErrors.confirmPassword =
        value !== password.value ? "As senhas não são iguais." : "";
    }

    setErrors(newErrors);
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === "username") setUsername(value);
    if (fieldName === "name") setName(value);
    if (fieldName === "email") setEmail(value);
    if (fieldName === "password") setPassword({ ...password, value });
    if (fieldName === "confirmPassword")
      setConfirmPassword({ ...confirmPassword, value });

    validateField(fieldName, value);
  };

  const handleToggleShowPassword = (fieldName) => {
    if (fieldName === "password") {
      setPassword({ ...password, show: !password.show });
    } else if (fieldName === "confirmPassword") {
      setConfirmPassword({ ...confirmPassword, show: !confirmPassword.show });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername("");
    setName("");
    setEmail("");
    setPassword({ value: "", show: false });
    setConfirmPassword({ value: "", show: false });
    setErrors({
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  console.log({ username, name, email, password, confirmPassword, errors });

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <InputField
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {errors.username && (
          <p className="text-white text-sm text-left ml-1">{errors.username}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && (
          <p className="text-white text-sm text-left ml-1">{errors.name}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <InputField
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-white text-sm text-left ml-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <InputField
          type={password.show ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Senha"
          value={password.value}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-white text-sm p-2"
          onClick={() => handleToggleShowPassword("password")}
        >
          {password.show ? (
            <Icon id="invisible" width={26} height={23} />
          ) : (
            <Icon id="visible" width={24} height={17} />
          )}
        </button>
        {errors.password && (
          <p className="text-white text-sm text-left ml-1">{errors.password}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <InputField
          type={confirmPassword.show ? "text" : "password"}
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirme a senha"
          value={confirmPassword.value}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-white text-sm p-2"
          onClick={() => handleToggleShowPassword("confirmPassword")}
        >
          {confirmPassword.show ? (
            <Icon id="invisible" width={26} height={23} />
          ) : (
            <Icon id="visible" width={24} height={17} />
          )}
        </button>
        {errors.confirmPassword && (
          <p className="text-white text-sm text-left ml-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <FormButton isValid={isValid}>CRIAR CONTA</FormButton>
    </form>
  );
}
