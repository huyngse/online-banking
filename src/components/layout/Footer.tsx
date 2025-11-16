import { logout } from "@/lib/actions/user.actions";
import { AppwriteUser } from "@/types/appwrite";
import Image from "next/image";

interface FooterProps {
  user: AppwriteUser;
  type?: "desktop" | "mobile";
}

function Footer({ user, type = "desktop" }: FooterProps) {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <footer className="footer">
      <div className={"footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div className={"footer_email"}>
        <p className="text-14 truncate text-gray-700 font-semibold">
          {user.name}
        </p>
        <p className="text-14 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>
      <Image
        src={"/icons/logout.svg"}
        alt="logout"
        width={20}
        height={20}
        onClick={handleLogout}
      />
    </footer>
  );
}

export default Footer;
