"use server"

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";

const { APPWRITE_DATABASE_ID } = process.env;

interface CreateTransactionProps {
    name: string;
    amount: string;
    senderId: string;
    senderBankId: string;
    receiverId: string;
    receiverBankId: string;
    email?: string;
}

export const createTransaction = async (data: CreateTransactionProps): Promise<Transaction> => {
    try {
        const { tablesDB } = await createAdminClient();
        const newTransaction = await tablesDB.createRow({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "transactions",
            rowId: ID.unique(),
            data: {
                channel: "online",
                category: "Transfer",
                ...data
            },
        })
        return newTransaction as unknown as Transaction;
    } catch (err) {
        console.log("An error occurred while creating a transaction.", err);
        throw err;
    }
}

export const getTransactionsByBankId = async ({ bankId }: { bankId: string }) => {
    try {
        const { tablesDB } = await createAdminClient();
        const senderTransactions = await tablesDB.listRows<Transaction & Models.Row>({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "transactions",
            queries: [Query.equal("senderBankId", bankId)]
        });
        const receiverTransactions = await tablesDB.listRows<Transaction & Models.Row>({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "transactions",
            queries: [Query.equal("receiverBankId", bankId)]
        });

        const transactions = {
            total: senderTransactions.total + receiverTransactions.total,
            rows: [...senderTransactions.rows, ...receiverTransactions.rows]
        }

        return transactions
    } catch (err) {
        console.log("An error occurred while getting transactions by bank ID.", err);
        throw err;
    }
}