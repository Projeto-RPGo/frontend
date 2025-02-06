function SignUpLink() {
    return (
      <p className="text-center text-white mt-4 text-sm">
        Já tem conta?{" "}
        <a href="/login" className="underline hover:text-gray-300">
          Login
        </a>
      </p>
    );
  }
  
  export default SignUpLink;
  