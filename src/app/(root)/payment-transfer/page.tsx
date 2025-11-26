import HeaderBox from "@/components/misc/HeaderBox";
import PaymentTransferForm from "@/components/misc/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function PaymentTransfer() {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) {
    throw Error("An error occurred while getting accounts from Plaid.");
  }

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </section>
    </section>
  );
}

export default PaymentTransfer;
