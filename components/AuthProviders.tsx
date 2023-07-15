"use client";

import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "./Button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            title='Sign In'
            className=" bg-primary-purple text-white font-semibold"
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    );
  }
}
