"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signInSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { signIn } from "@/lib/actions/user.actions";

const SignInForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);
    console.log(values);
    try {
      await signIn(values);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Vertico logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Vertico
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <div>
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user ? "Link Account" : "Sign In"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </div>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">Plaid link</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="form-btn w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp;Signing In
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      )}
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          Don't have an account?
        </p>
        <Link href={"/sign-up"} className="form-link">
          Sign up
        </Link>
      </footer>
    </section>
  );
};

export default SignInForm;
