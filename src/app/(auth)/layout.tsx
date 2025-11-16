import Image from "next/image";
import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <Image src={"/icons/auth-image.svg"} alt="" width={500} height={500} />
      </div>
    </main>
  );
}

export default AuthLayout;
