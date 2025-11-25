import CreditCard from "@/components/misc/CreditCard";
import HeaderBox from "@/components/misc/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function MyBanks() {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your bank activities."
        />
        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: PlaidAccount) => (
                <CreditCard
                  key={a.id}
                  account={a}
                  username={`${loggedIn.firstName} ${loggedIn.lastName}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyBanks;
