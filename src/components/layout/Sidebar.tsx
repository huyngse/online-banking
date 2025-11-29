"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "../auth/PlaidLink";

interface SidebarProps {
  user: User;
}

function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <section className="p-5 min-h-screen flex flex-col">
      <nav className="space-y-2 flex-1">
        <Link href={"/"} className="mb-5 gap-2 flex items-center">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Vertico logo"
            className="size-6 max-xl:size-14"
          />
          <h1 className="sidebar-logo">Vertico</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient": isActive,
              })}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn({ "brightness-[3] invert-0": isActive })}
              />
              <p className={cn("sidebar-label", { "text-white!": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} variant="" />
      </nav>
      <Footer user={user} />
    </section>
  );
}

export default Sidebar;
