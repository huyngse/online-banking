import HeaderBox from "@/components/misc/HeaderBox";
import TransactionsTable from "@/components/misc/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import { redirect } from "next/navigation";

async function TransactionHistory(props: SearchParamProps) {
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
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transactions History"
          subtext="See your bank details and transactions"
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold traking-[1.1px] text-white">
              ●●●● ●●●● ●●●●{" "}
              <span className="text-16">{account?.data.mask || 1234}</span>
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance || 0)}
            </p>
          </div>
        </div>

        <section className="w-full flex flex-col gap-6">
          <TransactionsTable transactions={account?.transactions || []} />
        </section>
      </div>
    </section>
  );
}

export default TransactionHistory;
