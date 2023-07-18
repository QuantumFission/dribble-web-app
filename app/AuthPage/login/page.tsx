import LoginPage from "@/components/Login/LoginPage";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Login() {
  const session = await getCurrentUser();
  if (session) redirect("/");

  return (
    <>
      <LoginPage />
    </>
  );
}
