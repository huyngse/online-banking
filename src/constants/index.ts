import { BanknoteIcon, HistoryIcon, HomeIcon, SendIcon } from "lucide-react";

export const sidebarLinks = [
    { route: "/", label: "Home", icon: HomeIcon },
    { route: "/my-banks", label: "My Banks", icon: BanknoteIcon },
    { route: "/transaction-history", label: "Transaction History", icon: HistoryIcon },
    { route: "/payment-transfer", label: "Transfer Funds", icon: SendIcon },
]