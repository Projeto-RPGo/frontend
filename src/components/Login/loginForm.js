"use client";

import { useState } from "react";
import FormButton from "../Forms/formButton";
import InputField from "../Forms/inputField";
import { Icon } from "../Icon/icon";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", show: false });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const isValid =
    Object.values(errors).every((error) => error === "") &&
    email.trim() !== "" &&
    password.value.trim() !== "";

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

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

    setErrors(newErrors);
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === "email") setEmail(value);
    if (fieldName === "password") setPassword({ ...password, value });

    validateField(fieldName, value);
  };

  const handleToggleShowPassword = (fieldName) => {
    setPassword({ ...password, show: !password.show });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword({ value: "", show: false });
    setErrors({
      email: "",
      password: "",
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
      <FormButton isValid={isValid}>LOGIN</FormButton>
    </form>
  );
}
