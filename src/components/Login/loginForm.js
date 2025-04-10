"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormButton from "../Forms/formButton";
import InputField from "../Forms/inputField";
import { Icon } from "../Icon/icon";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({ value: "", show: false });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    apiError: "",
  });

  function getCookie(name) {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }

  const isValid =
    Object.values(errors).every((error) => error === "") &&
    username.trim() !== "" &&
    password.value.trim() !== "";

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === "username") {
      newErrors.username = !value.trim()
        ? "O campo Username é obrigatório."
        : "";
    }

    setErrors(newErrors);
  };

  const handleChange = (fieldName, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
      apiError: "",
    }));

    if (fieldName === "username") setUsername(value);
    if (fieldName === "password") setPassword({ ...password, value });
  };

  const handleToggleShowPassword = () => {
    setPassword({ ...password, show: !password.show });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateField("username", username);
    validateField("password", password.value);

    if (!isValid) return;

    setErrors((prevErrors) => ({ ...prevErrors, apiError: "" }));

    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        credentials: "include",
        body: JSON.stringify({ username, password: password.value }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas. Verifique seu username e senha.");
      }

      const data = await response.json();

      router.push("/");
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiError: error.message,
      }));
    }
  };

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
          onClick={handleToggleShowPassword}
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

      {errors.apiError && <p className="text-red-500 text-sm text-center">{errors.apiError}</p>}

      <FormButton isValid={isValid}>LOGIN</FormButton>
    </form>
  );
}
