"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { deleteProject } from "@/firebase/actions";

export default function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteProject(projectId);
    router.push("/");
  };

  return (
    <div className=" flex items-center gap-8 bg-gray-100/70 rounded-md">
      <Button
        title="Edit shot"
        className="bg-transparent text-gray-600 py-6 font-semibold"
        handleClick={() => router.push(`/edit-project/${projectId}`)}
      />
      <Button
        title="Delete"
        handleClick={handleDelete}
        className="bg-transparent text-gray-600 py-6 font-semibold"
      />
    </div>
  );
}
