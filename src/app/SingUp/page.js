import LogoWithTitle from "../components/LogoWithTitle";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SignUpLink from "../components/SignUpLink";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#D4A59A]">
      <div className="w-full max-w-sm p-6">
        {/* Reutilizando o componente de logo e título */}
        <LogoWithTitle />

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* Campos do formulário */}
          <InputField
            type="text"
            placeholder="USERNAME"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            }
          />
          <InputField
            type="email"
            placeholder="EMAIL"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12h4m0 0v8m0-8l-4 4m0 0l-4-4m4 4V4m0 16l4-4m0 0l4-4"
                />
              </svg>
            }
          />
          <InputField
            type="password"
            placeholder="PASSWORD"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c2.5 0 4-1.5 4-3.5S14.5 4 12 4s-4 1.5-4 3.5S9.5 11 12 11zm0 0v5m0 0H9m3 0h3"
                />
              </svg>
            }
          />
          <InputField
            type="password"
            placeholder="CONFIRM PASSWORD"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c2.5 0 4-1.5 4-3.5S14.5 4 12 4s-4 1.5-4 3.5S9.5 11 12 11zm0 0v5m0 0H9m3 0h3"
                />
              </svg>
            }
          />

          {/* Botão Criar Conta */}
          <Button label="CRIAR CONTA" variant="primary" />
        </form>

        {/* Link para login */}
        <SignUpLink />
      </div>
    </div>
  );
}
