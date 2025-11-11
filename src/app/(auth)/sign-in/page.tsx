import AuthForm from "@/components/SignInForm";

function SignInPage() {
  return (
    <div className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in"/>
    </div>
  );
}

export default SignInPage;
