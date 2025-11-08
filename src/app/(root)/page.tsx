import HeaderBox from "@/components/HeaderBox";

export default function Home() {
  const loggedIn = { firstName: "John" };
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
        </header>
      </div>
    </section>
  );
}
