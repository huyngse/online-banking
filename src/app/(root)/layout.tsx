import { ReactNode } from "react";

function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      SIDEBAR
      {children}
    </main>
  );
}

export default RootLayout;
