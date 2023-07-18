import SignUpPage from "@/components/Login/SignUpPage";
import { getCurrentUser } from "@/lib/session";
import React from "react";
import { redirect } from "next/navigation";

export default async function SignUp() {

  const session = await getCurrentUser();
  if (session) redirect('/');

  return (
    <>
      <SignUpPage />
    </>
  );
}
