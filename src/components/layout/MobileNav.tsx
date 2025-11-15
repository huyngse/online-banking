"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  user: User;
}

function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <section className="">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="Menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-white p-3 w-full max-w-[264px]"
        >
          <SheetTitle className="sr-only">Mobile Nav</SheetTitle>
          <Link href={"/"} className="flex items-center gap-1 px-4">
            <Image
              src={"/icons/logo.svg"}
              width={34}
              height={34}
              alt="Vertico logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Vertico
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);
                return (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.route}
                      className={cn("mobilenav-sheet_close w-full", {
                        "bg-bank-gradient": isActive,
                      })}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                        className={cn({
                          "brightness-[3] invert-0": isActive,
                        })}
                      />
                      <p
                        className={cn("text-16 font-semibold text-black-2", {
                          "text-white": isActive,
                        })}
                      >
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
              USER
            </nav>
          </div>
          FOOTER
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav;
