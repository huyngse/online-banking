"use client";
import { AppwriteUser } from "@/types/appwrite";
import { Button } from "../ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

interface PlaidLinkProps {
  user: User;
  variant: string;
}

function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
      router.push("/");
    },
    [user]
  );

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  );
}

export default PlaidLink;
