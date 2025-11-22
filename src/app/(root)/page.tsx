import HeaderBox from "@/components/misc/HeaderBox";
import RightSidebar from "@/components/layout/RightSidebar";
import TotalBalanceBox from "@/components/misc/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";

export default async function Home(props: SearchParamProps) {
  const { id, page } = await props.searchParams;
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts || !accounts.data[0]) return redirect("/sign-in");

  const appwriteItemId = (id as string) || accounts.data[0].appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="no-scrollbar home-content">
        <header className="no-scrollbar home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions ?? []}
        banks={accounts.data.slice(0, 2)}
      />
    </section>
  );
}
