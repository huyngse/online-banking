import Image from "next/image";
import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid lg:grid-cols-2 h-screen w-full font-inter">
      <div className="h-screen overflow-auto grid items-center">{children}</div>
      <div className="relative bg-slate-100 hidden lg:block">
        <Image
          src={"/icons/auth-image.svg"}
          alt=""
          width={500}
          height={500}
          className="absolute top-1/2 -translate-y-1/2 right-0"
        />
      </div>
    </main>
  );
}

export default AuthLayout;
