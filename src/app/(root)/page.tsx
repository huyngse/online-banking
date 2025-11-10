import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

export default function Home() {
  const loggedIn: User = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  };
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
