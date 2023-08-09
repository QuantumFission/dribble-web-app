import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { SessionInterface } from "@/common.types";

export default function FetchFailed({
  session,
}: {
  session: SessionInterface | null;
}) {
  return (
    <>
      <Navbar session={session} />
      <div className=" flex flex-col gap-3 w-full py-[180px] flexCenter">
        <h2 className=" text-gray-600 font-bold text-4xl">
          Failed to fetch project information
        </h2>
        <p className=" text-sm text-gray-600 font-semibold">
          Please try to{" "}
          <span className=" text-blue-500 font-bold">refresh() </span> the page
          again .
        </p>
      </div>
      <Footer />
    </>
  );
}
