import LogoWithTitle from "../../components/logoWithTitle";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import SignUpLink from "../../components/signUpLink";
import UserIcon from "../../lib/icons/UserIcon";
import EmailIcon from "../../lib/icons/EmailIcon";
import PasswordIcon from "../../lib/icons/PasswordIcon";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#D4A59A]">
      <div className="w-full max-w-sm p-6">
        {/* Reutilizando o componente de logo e título */}
        <LogoWithTitle />

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* Campos do formulário */}
            <InputField type="text" placeholder="USERNAME" icon={<UserIcon />} />
            <InputField type="email" placeholder="EMAIL" icon={<EmailIcon />} />
            <InputField type="password" placeholder="PASSWORD" icon={<PasswordIcon />} />
            <InputField type="confirmPassword" placeholder="CONFIRM PASSWORD" icon={<PasswordIcon />} />
          {/* Botão Criar Conta */}
          <Button label="CRIAR CONTA" variant="primary" />
        </form>

        {/* Link para login */}
        <SignUpLink />
      </div>
    </div>
  );
}
