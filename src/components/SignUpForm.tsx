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
import { signUpSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { DatePickerField } from "./DatePicker";
import { PasswordInput } from "./PasswordInput";
import { signUp } from "@/lib/actions/user.actions";

const SignUpForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      address1: "",
      confirmPassword: "",
      dateOfBirth: new Date("2000-01-01"),
      firstName: "",
      lastName: "",
      password: "",
      postalCode: "",
      ssn: "",
      state: "",
      city: ""
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setLoading(true);
    try {
      const newUser = await signUp(values);
      console.log(newUser);
      setUser(newUser);
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
              {user ? "Link Account" : "Sign Up"}
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 11101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your specific address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePickerField
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSN</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
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
                <FormItem className="col-span-2">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Re-enter your password"
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
              className="form-btn w-full col-span-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp;Signing up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      )}
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          Already have an account?
        </p>
        <Link href={"/sign-in"} className="form-link">
          Sign in
        </Link>
      </footer>
    </section>
  );
};

export default SignUpForm;
