import Link from "next/link";

function SignUpLink() {
    return (
      <p className="text-center text-white mt-4 text-sm">
        Já tem conta?{" "}
        <Link href="/" className="underline hover:text-gray-300">
          Login
        </Link>
      </p>
    );
  }
  
  export default SignUpLink;
  