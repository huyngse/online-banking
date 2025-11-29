export const dynamic = "force-dynamic";

import MobileNav from "@/components/layout/MobileNav";
import Sidebar from "@/components/layout/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return redirect("/sign-in");
  }

  return (
    <main className="grid grid-cols-12 h-screen w-full font-inter">
      <div className="h-screen overflow-auto hidden lg:block xl:col-span-3 2xl:col-span-2 bg-white shadow">
        <Sidebar user={loggedIn} />
      </div>
      <div className="col-span-9 2xl:col-span-10">
        <div className="root-layout">
          <Image src={"/icons/logo.svg"} width={30} height={30} alt="Logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

export default RootLayout;
