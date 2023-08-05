import { redirect } from "next/navigation";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import { getCurrentUser } from "@/lib/session";

export default async function CreateProject() {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <section>
      <ProjectForm type="create" session={session} />
    </section>
  );
}
