"use server"

import { signInSchema, signUpSchema } from "@/schemas"
import z from "zod"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { ID } from "node-appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async (data: z.infer<typeof signInSchema>) => {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(data);
    return parseStringify(response);
}

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
        const { account } = await createAdminClient();
        const newUser = await account.create({
            userId: ID.unique(),
            email: data.email,
            password: data.password,
            name: data.firstName + " " + data.lastName
        });
        const session = await account.createEmailPasswordSession({
            email: data.email,
            password: data.password,
        });
        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (err) {
        console.log(err)
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}