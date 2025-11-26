import { ID } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";

const { APPWRITE_DATABASE_ID } = process.env;

interface CreateTransactionProps {
    name: string;
    amount: string;
    senderId: string;
    senderBankId: string;
    receiverId: string;
    receiverBankId: string;
    email: string;
}

export const createTransaction = async (data: CreateTransactionProps) => {
    try {
        const { tablesDB } = await createAdminClient();
        const newTransaction = tablesDB.createRow({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "transactions",
            rowId: ID.unique(),
            data: {
                channel: "online",
                category: "Transfer",
                ...data
            },
        })
    } catch (err) {
        console.log("An error occurred while creating a transaction.", err);
        throw err;
    }
}