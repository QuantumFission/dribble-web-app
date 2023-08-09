import { redirect } from "next/navigation";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import React from "react";
import { getProjectDetails } from "@/firebase/actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProject({ params: { id } }: Props) {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");

  const result = await getProjectDetails(id);

  return (
    <section>
      {result && (
        <ProjectForm
          type="edit"
          session={session}
          projectId={result.id}
          title={result.title}
          description={result.description}
          images={result.images}
          liveSiteUrl={result.liveSiteUrl}
          githubUrl={result.githubUrl}
          category={result.category}
          timestamp={result.timestamp}
        />
      )}
    </section>
  );
}
