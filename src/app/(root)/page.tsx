import HeaderBox from "@/components/misc/HeaderBox";
import RightSidebar from "@/components/layout/RightSidebar";
import TotalBalanceBox from "@/components/misc/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { AppwriteUser } from "@/types/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const loggedIn: AppwriteUser | null = await getLoggedInUser();

  if (!loggedIn) {
    return redirect("/sign-in");
  }

  return (
    <section className="home">
      <div className="no-scrollbar home-content">
        <header className="no-scrollbar home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name.split(/\s+/)[0] || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[
          {
            currentBalance: 123.5,
          },
          { currentBalance: 500 },
        ]}
      />
    </section>
  );
}
