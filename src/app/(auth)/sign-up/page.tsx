import AuthForm from "@/components/SignInForm";

function SignUpPage() {
  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </div>
  );
}

export default SignUpPage;
