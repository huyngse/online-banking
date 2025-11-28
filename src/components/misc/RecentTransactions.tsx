import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

interface RecentTransactionsProps {
  accounts: PlaidAccount[];
  transactions?: Transaction[];
  appwriteItemId: string;
  page?: number;
}

const RecentTransactions = ({
  accounts,
  transactions = [],
  page = 1,
  appwriteItemId,
}: RecentTransactionsProps) => {
  const pageSize = 10;
  const totalPages = Math.ceil(transactions.length / pageSize);

  const offset = pageSize * (page - 1);
  const paginated = transactions.slice(offset, offset + pageSize);

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Button asChild variant="outline">
          <Link href={`/transaction-history?id=${appwriteItemId}`}>
            View all
          </Link>
        </Button>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist bg-white">
          {accounts.map((a) => (
            <TabsTrigger
              key={a.id}
              value={a.appwriteItemId}
              className="data-[state=active]:bg-none data-[state=active]:shadow-none bg-none shadow-none"
            >
              <BankTabItem account={a} appwriteItemId={appwriteItemId} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((a) => (
          <TabsContent
            value={a.appwriteItemId}
            key={a.id}
            className="space-y-4"
          >
            <BankInfo
              account={a}
              appwriteItemId={a.appwriteItemId}
              type="full"
            />
            <TransactionsTable transactions={paginated} />
            {totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
