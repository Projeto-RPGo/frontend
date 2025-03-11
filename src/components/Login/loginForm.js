"use client";

import { useState } from "react";
import FormButton from "../Forms/formButton";
import InputField from "../Forms/inputField";
import { Icon } from "../Icon/icon";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({ value: "", show: false });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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
    if (fieldName === "username") setUsername(value);
    if (fieldName === "password") setPassword({ ...password, value });

    validateField(fieldName, value);
  };

  const handleToggleShowPassword = (fieldName) => {
    setPassword({ ...password, show: !password.show });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername("");
    setPassword({ value: "", show: false });
    setErrors({
      username: "",
      password: "",
    });
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
      <FormButton isValid={isValid} onClick={() => router.push("/")}>
        LOGIN
      </FormButton>
    </form>
  );
}
