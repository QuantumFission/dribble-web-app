import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function AuthProviders() {
  return (
    <div className=' flex gap-3 items-center'>
      <Link href="/AuthPage/login">
        <Button
          title='Log in'
          className=' bg-gray-50 text-c-dark hover:bg-gray-100 font-semibold px-4'
        />
      </Link>
      <Link href="/AuthPage/signUp">
        <Button
          title='Sign up'
          className=' bg-c-dark text-white hover:bg-gray-700 font-semibold px-4'
        />
      </Link>
    </div>
  );
}
