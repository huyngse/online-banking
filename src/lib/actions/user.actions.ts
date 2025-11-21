"use server"

import { signInSchema, signUpSchema } from "@/schemas"
import z from "zod"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { ID, Models, Query } from "node-appwrite"
import { cookies } from "next/headers"
import { extractCustomerIdFromUrl, parseStringify } from "../utils"
import { CountryCode, LinkTokenCreateRequest, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid"
import { plaidClient } from "../plaid"
import { revalidatePath } from "next/cache"
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions"

const APPWRITE_SESSION_COOKIE = "appwrite-session";
const { APPWRITE_DATABASE_ID } = process.env;

export const signIn = async (data: z.infer<typeof signInSchema>) => {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(data);

    (await cookies()).set(APPWRITE_SESSION_COOKIE, response.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    const user = await getUserByAuthId(response.userId);
    if (!user) {
        throw Error("No database user found for this account!");
    }

    return parseStringify(user);
}

export const signUp = async (data: z.infer<typeof signUpSchema>) => {

    let newUserAccount;
    try {
        const { account, tablesDB } = await createAdminClient();

        newUserAccount = await account.create({
            userId: ID.unique(),
            email: data.email,
            password: data.password,
            name: data.firstName + " " + data.lastName
        });

        if (!newUserAccount) throw new Error("An error occured while creating new user authentication account");

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...data,
            dateOfBirth: data.dateOfBirth.toISOString(),
            type: "personal"
        });

        if (!dwollaCustomerUrl) throw new Error("An error occured while creating Dwolla customer URL");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const partialData: Partial<typeof data> = { ...data };
        delete partialData.password;
        delete partialData.confirmPassword;

        const newUser = await tablesDB.createRow({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "users",
            data: {
                ...partialData,
                dwollaCustomerUrl,
                dwollaCustomerId,
                userId: newUserAccount.$id
            },
            rowId: ID.unique(),
        });

        const session = await account.createEmailPasswordSession({
            email: data.email,
            password: data.password,
        });

        (await cookies()).set(APPWRITE_SESSION_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (err) {
        console.log("An error occured while signing up: ", err);
    }
}

export async function getLoggedInUser(): Promise<User | null> {
    try {
        const { account } = await createSessionClient();
        const authUser = await account.get();
        const user = await getUserByAuthId(authUser.$id);
        return parseStringify(user);
    } catch (err) {
        return null;
    }
}

export async function logout() {
    const { account } = await createSessionClient();
    (await cookies()).delete(APPWRITE_SESSION_COOKIE);
    await account.deleteSession({ sessionId: "current" });
}

export async function createLinkToken(user: User) {
    try {
        const tokenParams: LinkTokenCreateRequest = {
            user: {
                client_user_id: user.$id
            },
            client_name: user.firstName + " " + user.lastName,
            products: [Products.Auth, Products.Transactions],
            language: "en",
            country_codes: [CountryCode.Us]
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: response.data.link_token });
    } catch (err) {
        console.log("An error occured while creating link token: ", err);
    }
}
interface CreateBankAccountProps {
    userId: string;
    bankId: string;
    accountId: string;
    accessToken: string;
    fundingSourceUrl: string;
    shareableId: string;
}

export async function createBankAccount(data: CreateBankAccountProps) {
    try {
        const { tablesDB } = await createAdminClient();
        const bankAccount = await tablesDB.createRow({
            databaseId: APPWRITE_DATABASE_ID!,
            data,
            tableId: "banks",
            rowId: ID.unique()
        });
        return bankAccount;
    } catch (err) {
        console.log("An error occured while creating bank account", err)
    }
}

interface ExchangePublicTokenProps { publicToken: string, user: User }

export async function exchangePublicToken({ publicToken, user }: ExchangePublicTokenProps) {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken
        });

        const accountData = accountsResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla
        }

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name
        });

        if (!fundingSourceUrl) throw Error;

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: btoa(accountData.account_id)
        });

        revalidatePath("/");

        return parseStringify({ publicTokenExchange: "complete" })
    } catch (err) {
        console.log("An error occured while creating exchanging token: ", err)
    }
}

export async function getBanks({ userId }: { userId: string }) {
    try {
        const { tablesDB } = await createAdminClient();
        const banks = await tablesDB.listRows({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "banks",
            queries: [Query.equal("userId", userId)]
        });

        return parseStringify(banks.rows);
    } catch (err) {
        console.log("An error occured while getting banks from user ID", err);
    }
}

export async function getBank({ rowId }: { rowId: string }) {
    try {
        const { tablesDB } = await createAdminClient();
        const bank = await tablesDB.listRows({
            databaseId: APPWRITE_DATABASE_ID!,
            tableId: "banks",
            queries: [Query.equal("$id", rowId)]
        });

        return parseStringify(bank.rows[0]);
    } catch (err) {
        console.log("An error occured while getting banks from user ID", err);
    }
}

export async function getUserByAuthId(id: string) {
    const { tablesDB } = await createAdminClient();

    const userRows = await tablesDB.listRows<User & Models.Row>({
        databaseId: APPWRITE_DATABASE_ID!,
        tableId: "users",
        queries: [Query.equal("userId", id)]
    });

    return userRows.rows[0] as User;
}