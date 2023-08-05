import { UserDetails } from "@/common.types";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectModal from "@/components/ProjectPage/ProjectModal";
import { getProjectDetails, getUserDetails } from "@/firebase/actions";
import { getCurrentUser } from "@/lib/session";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Project({ params: { id } }: Props) {
  const session = await getCurrentUser();
  const project = await getProjectDetails(id);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className=" flex flex-col gap-3 w-full py-[180px] flexCenter">
          <h2 className=" text-gray-600 font-bold text-4xl">
            Failed to fetch project information
          </h2>
          <p className=" text-sm text-gray-600 font-semibold">
            Please try to{" "}
            <span className=" text-blue-500 font-bold">refresh() </span> the
            page again .
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return <ProjectModal project={project} session={session} />;
}
