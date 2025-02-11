import LogoWithTitle from "./components/logoWithTitle";
import InputField from "./components/inputField";
import Button from "./components/button";
import ForgotPassword from "./components/forgotPassword";
import HeaderMenu from "./components/hearderMenu";

export default function LoginPage() {
  return (
    <div className="bg-[#D4A59A] pt-5">
      <HeaderMenu />
  
      <div className="flex items-center justify-center h-screen bg-[#D4A59A] pb-10">
        
        <div className="w-full max-w-sm p-6 bg-transparent">
          {/* Componente para o logo e título */}
          <LogoWithTitle />

          {/* Inputs e Botões */}
          <div className="space-y-6">
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
            <Button label="LOGIN" variant="primary" />
            <Button label="CRIAR CONTA" variant="secondary" />

            {/* Link para "Forgot Password" */}
            <ForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
}
